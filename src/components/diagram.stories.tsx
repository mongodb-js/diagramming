import { Meta, StoryObj } from '@storybook/react';
import { Diagram } from '@/components/diagram';

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
  },
};

export default diagram;
type Story = StoryObj<typeof Diagram>;
export const BasicDiagram: Story = {};
