import { Meta, StoryObj } from '@storybook/react';

import { Diagram } from '@/components/diagram';
import { EMPLOYEE_TERRITORIES_NODE, EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { EMPLOYEES_TO_EMPLOYEES_EDGE, ORDERS_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';
import { DiagramStressTestDecorator } from '@/mocks/decorators/diagram-stress-test.decorator';
import { DiagramConnectableDecorator } from '@/mocks/decorators/diagram-connectable.decorator';

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

export const DiagramStressTest: Story = {
  decorators: [DiagramStressTestDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [],
  },
};
