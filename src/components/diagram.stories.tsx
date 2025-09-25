import { Meta, StoryObj } from '@storybook/react';

import { Diagram } from '@/components/diagram';
import { EMPLOYEE_TERRITORIES_NODE, EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { EMPLOYEES_TO_EMPLOYEES_EDGE, ORDERS_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';
import { DiagramStressTestDecorator } from '@/mocks/decorators/diagram-stress-test.decorator';
import { DiagramConnectableDecorator } from '@/mocks/decorators/diagram-connectable.decorator';
import { DiagramEditableInteractionsDecorator } from '@/mocks/decorators/diagram-editable-interactions.decorator';

const diagram: Meta<typeof Diagram> = {
  title: 'Diagram',
  component: Diagram,
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [ORDERS_TO_EMPLOYEES_EDGE, EMPLOYEES_TO_EMPLOYEES_EDGE],
    nodes: [ORDERS_NODE, EMPLOYEES_NODE, EMPLOYEE_TERRITORIES_NODE],
  },
};

export default diagram;
type Story = StoryObj<typeof Diagram>;
export const BasicDiagram: Story = {};
export const DiagramWithConnectableNodes: Story = {
  decorators: [DiagramConnectableDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [
      { ...ORDERS_NODE, connectable: true },
      { ...EMPLOYEES_NODE, connectable: true },
    ],
  },
};

let idAccumulator: string[];
let lastDepth = 0;
// Used to build a string array id based on field depth.
function idFromDepthAccumulator(name: string, depth?: number) {
  if (!depth) {
    idAccumulator = [name];
  } else if (depth > lastDepth) {
    idAccumulator.push(name);
  } else if (depth === lastDepth) {
    idAccumulator[idAccumulator.length - 1] = name;
  } else {
    idAccumulator = idAccumulator.slice(0, depth);
    idAccumulator[depth] = name;
  }
  lastDepth = depth ?? 0;
  return [...idAccumulator];
}
export const DiagramWithEditInteractions: Story = {
  decorators: [DiagramEditableInteractionsDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [
      {
        ...ORDERS_NODE,
        fields: [
          ...ORDERS_NODE.fields.map(field => ({
            ...field,
            id: idFromDepthAccumulator(field.name, field.depth),
            selectable: true,
          })),
        ],
      },
      {
        ...EMPLOYEES_NODE,
        fields: [
          ...EMPLOYEES_NODE.fields.map(field => ({
            ...field,
            id: idFromDepthAccumulator(field.name, field.depth),
            selectable: true,
          })),
        ],
      },
    ],
  },
};

export const DiagramStressTest: Story = {
  decorators: [DiagramStressTestDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [],
  },
};
