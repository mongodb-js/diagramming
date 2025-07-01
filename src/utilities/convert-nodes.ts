import { InternalNode } from '@/types/internal';
import { NodeProps, NodeType } from '@/types';

export const convertToExternalNode = (node: InternalNode): NodeProps => {
  const { data, ...rest } = node;
  return {
    ...rest,
    ...data,
    type: node.type as NodeType,
  };
};

export const convertToExternalNodes = (nodes: InternalNode[]): NodeProps[] => {
  return nodes.map(node => convertToExternalNode(node));
};

export const convertToInternalNode = (node: NodeProps): InternalNode => {
  const { title, fields, borderVariant, disabled, connectable, ...rest } = node;
  return {
    ...rest,
    connectable: connectable ?? false,
    data: {
      title,
      disabled,
      fields,
      borderVariant,
    },
  };
};

export const convertToInternalNodes = (nodes: NodeProps[]): InternalNode[] => {
  return nodes.map(node => convertToInternalNode(node));
};
