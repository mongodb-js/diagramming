import '@testing-library/jest-dom';

import * as matchers from 'jest-extended';
import { expect } from 'vitest';

window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

expect.extend(matchers);
