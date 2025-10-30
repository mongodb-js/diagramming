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
  const base = {
    connectable: connectable ?? false,
    data: {
      title,
      disabled,
      fields,
      borderVariant,
    },
  };

  if (rest.variant === 'default') {
    const { variant, ...otherProps } = rest;
    return {
      ...otherProps,
      ...base,
      data: {
        ...base.data,
        variant,
      },
    };
  }

  if (rest.variant === 'warn') {
    const { variant, warnMessage, ...otherProps } = rest;
    return {
      ...otherProps,
      ...base,
      data: {
        ...base.data,
        variant,
        warnMessage,
      },
    };
  }
  return {
    ...rest,
    ...base,
  };
};

export const convertToInternalNodes = (nodes: NodeProps[]): InternalNode[] => {
  return nodes.map(node => convertToInternalNode(node));
};
