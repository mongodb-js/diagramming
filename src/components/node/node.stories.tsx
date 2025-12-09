import { Meta, StoryObj } from '@storybook/react';
import { ReactFlowProvider } from '@xyflow/react';

import { InternalNode } from '@/types/internal';
import { Node } from '@/components/node/node';
import { EditableDiagramInteractionsProvider } from '@/hooks/use-editable-diagram-interactions';
import { NodeField, NodeProps } from '@/types';

const fields = [
  {
    name: 'customerId',
    type: 'string',
    hasChildren: false,
  },
  {
    name: 'companyName',
    type: 'string',
    hasChildren: false,
  },
  {
    name: 'phoneNumber',
    type: 'number',
    hasChildren: false,
  },
];
const INTERNAL_NODE: InternalNode = {
  id: 'orders',
  type: 'collection',
  position: { x: 100, y: 100 },
  data: {
    title: 'orders',
    visibleFields: fields.map(field => ({ ...field, hasChildren: false })),
    externalNode: {} as unknown as NodeProps,
  },
};

const nodeStory: Meta<typeof Node> = {
  title: 'Node',
  component: Node,
  decorators: [
    Story => (
      <ReactFlowProvider>
        <EditableDiagramInteractionsProvider>
          <div style={{ padding: '100px' }}>
            <Story />
          </div>
        </EditableDiagramInteractionsProvider>
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

const fieldsWithGlyph: NodeField[] = [
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
];
export const FieldsWithGlyph: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithGlyph.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithMultipleGlyphs: NodeField[] = [
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
];
export const FieldsWithGlyphs: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithMultipleGlyphs.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithLongValues: NodeField[] = [
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
];
export const FieldsWithLongValues: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title:
        'enterprise_tenant_finance_department_legacy_system_us_east_1_schema_2025_v15_monthly_billing_transactions_20250702145533',
      visibleFields: fieldsWithLongValues.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const nestedFields: NodeField[] = [
  {
    name: 'customerId',
    type: 'string',
  },
  {
    name: 'detail',
    type: '{}',
    expanded: true,
  },
  {
    name: 'companyName',
    type: '{}',
    depth: 1,
    expanded: false,
  },
  {
    name: 'acronym',
    type: 'string',
    depth: 2,
  },
  {
    name: 'fullName',
    type: 'string',
    depth: 2,
  },
  {
    name: 'phoneNumber',
    type: 'number',
    depth: 1,
  },
];
export const NestedFields: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: nestedFields.map(field => ({ ...field, hasChildren: 'expanded' in field })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

export const NodeWithDefaultField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'default',
          glyphs: ['key'],
          hasChildren: false,
        },
      ],
      externalNode: {} as unknown as NodeProps,
    },
  },
};

export const DisabledNode: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      disabled: true,
      title: 'orders',
      visibleFields: [
        {
          name: 'customerId',
          type: 'string',
          glyphs: ['key'],
          hasChildren: false,
        },
      ],
      externalNode: {} as unknown as NodeProps,
    },
  },
};

export const DisabledField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'disabled',
          glyphs: ['key'],
          hasChildren: false,
        },
      ],
      externalNode: {} as unknown as NodeProps,
    },
  },
};

export const DisabledWithHoverVariant: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'disabled',
          hoverVariant: 'default',
          glyphs: ['key'],
          hasChildren: false,
        },
      ],
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const multipleTypesField: NodeField[] = [
  {
    name: 'customerId',
    type: ['string', 'number'],
    variant: 'default',
    glyphs: ['key'],
  },
  {
    name: 'customerId',
    type: ['string', 'number', 'objectId', 'array', 'date', 'boolean', 'null', 'decimal', 'object', 'regex'],
  },
];
export const NodeWithMultipleTypesField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: multipleTypesField.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

export const NodeWithPrimaryField: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: [
        {
          name: 'customerId',
          type: 'string',
          variant: 'primary',
          glyphs: ['key', 'link'],
          hasChildren: false,
        },
      ],
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithPreview: NodeField[] = [
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
];
export const NodeWithPreviewFields: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithPreview.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithPreviewGlyphs: NodeField[] = [
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
];
export const NodeWithPreviewGlyphs: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithPreviewGlyphs.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithSomePreviewGlyphs: NodeField[] = [
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
];
export const NodeWithSomePreviewGlyphs: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithSomePreviewGlyphs.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithNestedPreview: NodeField[] = [
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
];
export const NodeWithNestedPreviewFields: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithNestedPreview.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const deeplyNestedPreviewFields: NodeField[] = [
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
];
export const NodeWithDeeplyNestedPreviewFields: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: deeplyNestedPreviewFields.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithDeeplyNestedPreviewEverywhere: NodeField[] = [
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
];
export const NodeWithDeeplyNestedPreviewFieldsEverywhere: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithDeeplyNestedPreviewEverywhere.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithSelected: NodeField[] = [
  {
    name: '_id',
    type: 'objectid',
    glyphs: ['key'],
  },
  {
    name: 'customer',
    type: '{}',
    selected: true,
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
  },
  {
    name: 'source',
    type: 'string',
  },
  {
    name: 'orderedAt',
    type: 'date',
    selected: true,
  },
];
export const NodeWithSelectedFields: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      visibleFields: fieldsWithSelected.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsWithWarning: NodeField[] = [
  {
    name: '_id',
    type: 'objectid',
    glyphs: ['key'],
  },
  {
    name: 'customer',
    type: '{}',
  },
];
export const NodeWithWarningIcon: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders',
      variant: {
        type: 'warn',
        warnMessage: 'This is a warning message for the Orders node.',
      },
      visibleFields: fieldsWithWarning.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
    },
  },
};

const fieldsForLongTitleWarning: NodeField[] = [
  {
    name: '_id',
    type: 'objectid',
    glyphs: ['key'],
  },
  {
    name: 'customer',
    type: '{}',
  },
];
export const NodeWithLongTitleAndWarningIcon: Story = {
  args: {
    ...INTERNAL_NODE,
    data: {
      title: 'orders_with_a_very_long_title_exceeding_normal_length_limits',
      variant: {
        type: 'warn',
        warnMessage: 'This is a warning message for the Orders node.',
      },
      visibleFields: fieldsForLongTitleWarning.map(field => ({ ...field, hasChildren: false })),
      externalNode: {} as unknown as NodeProps,
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
