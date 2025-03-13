import { Meta, StoryObj } from '@storybook/react';
import { Diagram } from '@/diagram/diagram';

const meta: Meta<typeof Diagram> = {
  title: 'Diagram',
  component: Diagram,
};

export default meta;
type Story = StoryObj<typeof Diagram>;
export const BasicDiagram: Story = {};
