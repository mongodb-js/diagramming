import { Meta, StoryObj } from '@storybook/react';

import { InternalNode } from '@/types/internal';
import { Node } from '@/components/node/node';

const INTERNAL_NODE: InternalNode = {
  id: 'orders',
  type: 'collection',
  position: { x: 100, y: 100 },
  data: {
    title: 'orders',
    fields: [
      {
        name: 'customerId',
        type: 'string',
      },
      {
        name: 'companyName',
        type: 'string',
      },
      {
        name: 'phoneNumber',
        type: 'number',
      },
    ],
  },
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

export const FieldsWithGlyph: Story = {
  args: {
    ...INTERNAL_NODE,
    type: 'connectable',
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
          glyphs: ['key'],
        },
        {
          name: 'companyName',
          type: 'string',
          glyphs: ['link'],
        },
      ],
    },
  },
};

export const FieldsWithGlyphs: Story = {
  args: {
    ...INTERNAL_NODE,
    type: 'connectable',
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
          glyphs: ['key', 'link'],
        },
        {
          name: 'companyName',
          type: 'string',
          glyphs: ['key', 'link'],
        },
        {
          name: 'addressId',
          type: 'string',
        },
      ],
    },
  },
};

export const FieldsWithLongValues: Story = {
  args: {
    ...INTERNAL_NODE,
    type: 'connectable',
    data: {
      title: 'rm_demo_collection_orders_table_equivalent',
      fields: [
        {
          name: 'customerId',
          glyphs: ['key', 'link', 'link'],
          type: 'someReallyLongStringRepresentation',
        },
        {
          name: 'oneReallyReallyReally',
          type: 'string',
        },
        {
          name: 'anotherReallyLongName',
          type: 'someReallyLongStringRepresentation',
        },
      ],
    },
  },
};

export const NestedFields: Story = {
  args: {
    ...INTERNAL_NODE,
    type: 'connectable',
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
        },
        {
          name: 'detail',
          type: '{}',
        },
        {
          name: 'companyName',
          type: 'string',
          depth: 1,
        },
        {
          name: 'phoneNumber',
          type: 'number',
          depth: 1,
        },
      ],
    },
  },
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
