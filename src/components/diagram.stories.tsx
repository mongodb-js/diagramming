import { Meta, StoryObj } from '@storybook/react';

import { Diagram } from '@/components/diagram';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { ORDERS_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';

const diagram: Meta<typeof Diagram> = {
  title: 'Diagram',
  component: Diagram,
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [ORDERS_TO_EMPLOYEES_EDGE],
    nodes: [ORDERS_NODE, EMPLOYEES_NODE],
  },
};

export default diagram;
type Story = StoryObj<typeof Diagram>;
export const BasicDiagram: Story = {};
