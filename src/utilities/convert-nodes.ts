import { InternalNode, InternalNodeField } from '@/types/internal';
import { NodeField, NodeProps, NodeType } from '@/types';

export const convertToExternalNode = (node: InternalNode): NodeProps => {
  const { data, ...rest } = node;
  return {
    ...rest,
    ...data,
    fields: data.fields.map(({ isVisible: _isVisible, hasChildren: _hasChildren, ...field }) => field),
    type: node.type as NodeType,
  };
};

export const convertToExternalNodes = (nodes: InternalNode[]): NodeProps[] => {
  return nodes.map(node => convertToExternalNode(node));
};

function hasChildren(field: NodeField, index: number, fields: NodeField[]): boolean {
  const fieldDepth = field.depth ?? 0;
  const nextField = fields.length > index + 1 ? fields[index + 1] : null;
  if (!nextField) return false;
  return nextField.depth !== undefined && nextField.depth > fieldDepth;
}

// Filter out all the fields that are children of explicitly collapsed fields.
// We get fields as a flattened list with the depth indicaing the nesting
// level, so everything that is deeper than the collapsed field (child) will
// be filtered out as a child until we run into another element with the same
// depth (a sibling)
// We also annotate each field with whether it is expandable (has children)
// This is more reliable than checking the type of the field, since the object could be hidden in arrays, or simply have no children
function getInternalFields(fields: NodeField[]): InternalNodeField[] {
  const expandStatusMap = new Map<string, boolean>();
  const fieldsWithExpandStatus = fields.map((field, index) => {
    const fieldDepth = field.depth ?? 0;
    const parentField = field.id?.slice(0, -1);
    const parentExpandStatus = expandStatusMap.get(JSON.stringify(parentField)) ?? true;
    const fieldExpandStatus = field.expanded ?? true;
    expandStatusMap.set(JSON.stringify(field.id), fieldExpandStatus && parentExpandStatus);
    return {
      ...field,
      hasChildren: hasChildren(field, index, fields),
      isVisible: fieldDepth === 0 || parentExpandStatus,
    };
  });
  return fieldsWithExpandStatus;
}

export const convertToInternalNode = (node: NodeProps): InternalNode => {
  const { title, fields, borderVariant, disabled, connectable, variant, ...rest } = node;
  return {
    ...rest,
    connectable: connectable ?? false,
    data: {
      title,
      disabled,
      fields: getInternalFields(fields),
      borderVariant,
      variant,
    },
  };
};

export const convertToInternalNodes = (nodes: NodeProps[]): InternalNode[] => {
  return nodes.map(node => convertToInternalNode(node));
};
