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

export default nodeStory;
