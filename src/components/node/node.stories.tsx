import { Meta, StoryObj } from '@storybook/react';
import { ReactFlowProvider } from '@xyflow/react';

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
      <ReactFlowProvider>
        <div style={{ padding: '100px' }}>
          <Story />
        </div>
      </ReactFlowProvider>
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
    data: {
      title:
        'enterprise_tenant_finance_department_legacy_system_us_east_1_schema_2025_v15_monthly_billing_transactions_20250702145533',
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

export const NodeWithDefaultField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'default',
          glyphs: ['key'],
        },
      ],
    },
  },
};

export const DisabledNode: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      disabled: true,
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
          glyphs: ['key'],
        },
      ],
    },
  },
};

export const DisabledField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'disabled',
          glyphs: ['key'],
        },
      ],
    },
  },
};

export const DisabledWithHoverVariant: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'disabled',
          hoverVariant: 'default',
          glyphs: ['key'],
        },
      ],
    },
  },
};

export const NodeWithCustomTypeField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: (
            <span>
              <strong>custom type display</strong>
            </span>
          ),
          variant: 'default',
          glyphs: ['key'],
        },
      ],
    },
  },
};

export const NodeWithPrimaryField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'primary',
          glyphs: ['key', 'link'],
        },
      ],
    },
  },
};

export const NodeWithPreviewFields: Story = {
  args: {
    ...INTERNAL_NODE,
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
          variant: 'preview',
        },
        {
          name: 'phoneNumber',
          type: 'number',
          variant: 'preview',
        },
        {
          name: 'address',
          type: 'string',
          variant: 'preview',
        },
      ],
    },
  },
};

export const NodeWithPreviewGlyphs: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: '_id',
          type: 'string',
          variant: 'preview',
          glyphs: ['key'],
        },
        {
          name: 'customerId',
          type: 'string',
          variant: 'preview',
          glyphs: ['key', 'link'],
        },
        {
          name: 'companyName',
          type: 'string',
          variant: 'preview',
        },
      ],
    },
  },
};

export const NodeWithSomePreviewGlyphs: Story = {
  args: {
    ...INTERNAL_NODE,
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
          variant: 'preview',
        },
        {
          name: 'address',
          type: 'string',
          variant: 'preview',
        },
        {
          name: 'fullName',
          type: 'string',
          variant: 'preview',
        },
      ],
    },
  },
};

export const NodeWithNestedPreviewFields: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'orderId',
          type: 'string',
          glyphs: ['key'],
        },
        {
          name: 'customer',
          type: '{}',
          variant: 'preview',
        },
        {
          name: 'customerId',
          type: 'string',
          depth: 1,
          variant: 'preview',
        },
        {
          name: 'addresses',
          type: '[]',
          depth: 1,
          variant: 'preview',
        },
        {
          name: 'addresses',
          type: 'string',
          depth: 2,
          variant: 'preview',
        },
        {
          name: 'streetName',
          type: 'string',
          depth: 2,
          variant: 'preview',
        },
      ],
    },
  },
};

export const NodeWithDeeplyNestedPreviewFields: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'orderId',
          type: 'string',
          glyphs: ['key'],
        },
        {
          name: 'customer',
          type: '{}',
        },
        {
          name: 'customerId',
          type: 'string',
          depth: 1,
        },
        {
          name: 'addresses',
          type: '[]',
          depth: 1,
          variant: 'preview',
        },
        {
          name: 'streetName',
          type: 'string',
          depth: 2,
          variant: 'preview',
        },
        {
          name: 'postcode',
          type: 'number',
          depth: 2,
          variant: 'preview',
        },
        {
          name: 'country',
          type: 'string',
          depth: 2,
          variant: 'preview',
        },
      ],
    },
  },
};

export const NodeWithDeeplyNestedPreviewFieldsEverywhere: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      fields: [
        {
          name: 'orderId',
          type: 'string',
          glyphs: ['key'],
          variant: 'preview',
        },
        {
          name: 'customer',
          type: '{}',
        },
        {
          name: 'customerId',
          type: 'string',
          depth: 1,
        },
        {
          name: 'addresses',
          type: '[]',
          depth: 1,
        },
        {
          name: 'streetName',
          type: 'string',
          depth: 2,
          variant: 'preview',
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
