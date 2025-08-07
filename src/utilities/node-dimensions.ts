import type { BaseNode } from '@/types';

import {
  DEFAULT_FIELD_HEIGHT,
  DEFAULT_FIELD_PADDING,
  DEFAULT_NODE_HEADER_HEIGHT,
  DEFAULT_NODE_WIDTH,
} from './constants';

export const getNodeHeight = <N extends BaseNode>(node: N) => {
  if ('height' in node && typeof node.height === 'number') return node.height;
  if ('measured' in node && node.measured?.height) return node.measured.height;
  const fieldCount = !('fields' in node) || !Array.isArray(node.fields) ? 1 : node.fields.length;
  return DEFAULT_NODE_HEADER_HEIGHT + DEFAULT_FIELD_PADDING * 2 + fieldCount * DEFAULT_FIELD_HEIGHT;
};

export const getNodeWidth = <N extends BaseNode>(node: N) => {
  if ('width' in node && typeof node.width === 'number') return node.width;
  if ('measured' in node && node.measured?.width) return node.measured.width;
  return DEFAULT_NODE_WIDTH;
};
