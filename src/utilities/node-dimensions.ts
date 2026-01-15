import type { BaseNode, NodeProps } from '@/types';
import { InternalNode } from '@/types/internal';

import {
  DEFAULT_FIELD_HEIGHT,
  DEFAULT_FIELD_PADDING,
  DEFAULT_NODE_HEADER_HEIGHT,
  DEFAULT_NODE_WIDTH,
} from './constants';

export const getNodeHeight = <
  N extends Pick<BaseNode, 'measured'> | Pick<NodeProps, 'fields'> | Pick<InternalNode, 'data'>,
>(
  node: N,
) => {
  if ('height' in node && typeof node.height === 'number') return node.height;
  if ('measured' in node && node.measured?.height) return node.measured.height;

  let fieldCount = 1;
  if ('fields' in node && Array.isArray(node.fields)) {
    fieldCount = node.fields.length;
  }
  if ('data' in node) {
    let internalNode = node as InternalNode;
    if (internalNode.data?.fields && Array.isArray(internalNode.data.fields)) {
      fieldCount = internalNode.data.fields.filter(({ isVisible }) => isVisible).length;
    }
  }
  const calculatedHeight = getFieldYPosition(fieldCount) + DEFAULT_FIELD_PADDING;
  return calculatedHeight;
};

export const getFieldYPosition = (fieldIndex: number) =>
  DEFAULT_NODE_HEADER_HEIGHT + DEFAULT_FIELD_PADDING + 2 + fieldIndex * DEFAULT_FIELD_HEIGHT;

export const getNodeWidth = <N extends Pick<BaseNode, 'measured'> | Pick<InternalNode, 'width'>>(node: N) => {
  if ('width' in node && typeof node.width === 'number') return node.width;
  if ('measured' in node && node.measured?.width) return node.measured.width;
  return DEFAULT_NODE_WIDTH;
};
