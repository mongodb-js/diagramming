import { Meta, StoryObj } from '@storybook/react';

import { InternalNode } from '@/types/internal';
import { Node } from '@/components/node/node';

const INTERNAL_NODE: InternalNode = {
  id: 'orders',
  type: 'collection',
  position: { x: 100, y: 100 },
  data: { title: 'orders', fields: [{ name: 'one' }] },
};

const nodeStory: Meta<typeof Node> = {
  title: 'Node',
  component: Node,
  decorators: [
    Story => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof Node>;

export const CollectionType: Story = { args: INTERNAL_NODE };

export const RelationalType: Story = {
  args: { ...INTERNAL_NODE, type: 'table' },
};

export const ConnectableType: Story = {
  args: { ...INTERNAL_NODE, type: 'connectable' },
};

export const SelectedBorder: Story = {
  args: { ...INTERNAL_NODE, data: { ...INTERNAL_NODE.data, borderVariant: 'selected' } },
};

export const PreviewBorder: Story = {
  args: { ...INTERNAL_NODE, data: { ...INTERNAL_NODE.data, borderVariant: 'preview' } },
};

export const SubtleBorder: Story = {
  args: { ...INTERNAL_NODE, data: { ...INTERNAL_NODE.data, borderVariant: 'subtle' } },
};

export default nodeStory;
