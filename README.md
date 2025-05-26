# @mongodb-js/diagramming

**@mongodb-js/diagramming** is a React component library built on top of [React Flow](https://reactflow.dev/) for creating interactive, customizable diagrams, 
designed specifically for use cases in the MongoDB or relational world.

---

## Features

- **React Flow Integration**: Built on the robust foundation of React Flow.
- **Custom nodes and edges**: Easily define and render node or edge components.
- **Interactive UX**: Dragging, connecting, zooming, and panning built in.

---

## Installation

```bash
yarn add @mongodb-js/diagramming
```

##  Usage 

Here is a basic example of how to use the `Diagram` component:

```typescript jsx
import React from 'react';
import { Diagram } from '@mongodb-js/diagramming';

const nodes = [
  {
    id: '1',
    type: 'collection',
    data: { label: 'Node 1' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'collection',
    data: { label: 'Node 2' },
    position: { x: 250, y: 250 },
  }
];

const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'default',
  }
];

export const Component = () => {
  return <Diagram nodes={nodes} edges={edges} />;
}
```

## Running Tests
The project uses [Vitest](https://vitest.dev/) for unit testing.

To run all tests:

```bash
yarn test
````

## Running Storybook Locally
To explore components and their behavior in isolation:

```bash 
yarn install
yarn storybook
```

Storybook will run locally at http://localhost:6006.
 
### Resources
- [NPM Package](https://www.npmjs.com/package/@mongodb-js/diagramming)
- [React Flow Documentation](https://reactflow.dev/learn)
