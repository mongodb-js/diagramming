import { Meta, StoryObj } from '@storybook/react';

import { Diagram } from '@/components/diagram';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';

const diagram: Meta<typeof Diagram> = {
  title: 'Diagram',
  component: Diagram,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div
        style={{
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    nodes: [ORDERS_NODE, EMPLOYEES_NODE],
  },
};

export default diagram;
type Story = StoryObj<typeof Diagram>;
export const BasicDiagram: Story = {};
