#!/usr/bin/env ts-node

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

// This script is used to sync the built diagramming package
// to the local Compass to test while developing.

// For why we don't use npm link see:
// https://github.com/mongodb-js/compass/blob/117c32f8ddd5d2bf4f8fceec5b324bf9866de66e/packages/compass-web/scripts/sync-dist-to-mms.js#L47-L52

if (!process.env.COMPASS_HOME) {
  throw new Error('Missing required environment variable $COMPASS_HOME.');
}

const packageDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(__dirname, '..', 'src');
const libDir = path.resolve(__dirname, '..', 'dist');

const destDir = path.dirname(
  child_process.execFileSync('node', ['-p', "require.resolve('@mongodb-js/diagramming')"], {
    cwd: process.env.COMPASS_HOME,
    encoding: 'utf-8',
  }),
);

console.log({ packageDir, srcDir, libDir, destDir });

function debounce<T extends () => void>(
  fn: T,
  delay: number,
  options: { leading?: boolean; trailing?: boolean } = {},
): () => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    lastArgs = args;

    const executeCall = () => {
      fn.apply(this, lastArgs as Parameters<T>);
      timeoutId = null;
    };

    if (timeoutId === null && options.leading) {
      executeCall();
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (options.trailing !== false) {
      timeoutId = setTimeout(executeCall, delay);
    }
  };
}

const compileAndCopy = debounce(
  () => {
    try {
      child_process.execFileSync('yarn', ['build'], {
        cwd: packageDir,
        encoding: 'utf-8',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code) {
        // Spawning child process failed.
        console.error(err.code);
      } else {
        // Child was spawned but exited with non-zero exit code.
        // Error contains any stdout and stderr from the child.
        const { stdout, stderr } = err;

        console.log(stdout);
        console.error(stderr);
      }
    }
    fs.cpSync(libDir, destDir, { recursive: true });
    console.log('done.');
  },
  1_000,
  {
    leading: true,
    trailing: true,
  },
);

const srcWatcher = fs.watch(srcDir, { recursive: true }, (eventType: string, filename: string) => {
  console.log(eventType, filename);
  compileAndCopy();
});

function cleanup() {
  srcWatcher.close();
}

for (const evt of ['SIGINT', 'SIGTERM']) {
  process.on(evt, cleanup);
}

// Run an initial copy on startup.
compileAndCopy();
