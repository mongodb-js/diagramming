import { InternalNode } from '@/types/internal';
import { NodeField, NodeProps, NodeType } from '@/types';

export const convertToExternalNode = (node: InternalNode): NodeProps => {
  const { data, ...rest } = node;
  const { allFields, fields: _fields, ...otherData } = data;
  return {
    ...rest,
    ...otherData,
    fields: allFields,
    type: node.type as NodeType,
  };
};

export const convertToExternalNodes = (nodes: InternalNode[]): NodeProps[] => {
  return nodes.map(node => convertToExternalNode(node));
};

function hasChildren(fields: NodeField[], index: number): boolean {
  const fieldDepth = fields[index].depth ?? 0;
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
function getFieldsWithExpandStatus(fields: NodeField[]): (NodeField & { expandable: boolean })[] {
  const visibleFields: (NodeField & { expandable: boolean })[] = [];
  let currentDepth = 0;
  let skipChildren = false;
  fields.forEach((field, index) => {
    const fieldDepth = field.depth ?? 0;
    if (skipChildren && fieldDepth > currentDepth) {
      return;
    }
    currentDepth = fieldDepth;
    skipChildren = field.expanded === false;
    visibleFields.push({
      ...field,
      expandable: hasChildren(fields, index),
    });
  });
  return visibleFields;
}

export const convertToInternalNode = (node: NodeProps): InternalNode => {
  const { title, fields, borderVariant, disabled, connectable, variant, ...rest } = node;
  return {
    ...rest,
    connectable: connectable ?? false,
    data: {
      title,
      disabled,
      fields: getFieldsWithExpandStatus(fields),
      allFields: fields,
      borderVariant,
      variant,
    },
  };
};

export const convertToInternalNodes = (nodes: NodeProps[]): InternalNode[] => {
  return nodes.map(node => convertToInternalNode(node));
};
