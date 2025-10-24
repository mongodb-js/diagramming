import type { BaseNode, NodeProps } from '@/types';
import { InternalNode } from '@/types/internal';
import { NODE_HEADER_FONT } from '@/components/node/node';

import {
  DEFAULT_FIELD_HEIGHT,
  DEFAULT_FIELD_PADDING,
  DEFAULT_NODE_HEADER_LINE_HEIGHT,
  DEFAULT_NODE_HEADER_VERTICAL_PADDING,
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
      fieldCount = internalNode.data.fields.length;
    }
  }
  const title = 'data' in node ? (node as InternalNode).data.title : undefined;
  const calculatedHeight = getFieldYPosition(fieldCount, title) + DEFAULT_FIELD_PADDING;
  return calculatedHeight;
};

function setupCanvasContext() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = `${NODE_HEADER_FONT.weight} ${NODE_HEADER_FONT.size}px ${NODE_HEADER_FONT.family}`;
    }
    return ctx;
  } catch {
    return undefined;
  }
}

const canvasCtx = setupCanvasContext();

const getHeaderLines = (title?: string) => {
  if (!title || !canvasCtx) return 1;
  console.log(
    'Measuring title:',
    title,
    Math.ceil(canvasCtx.measureText(title).width / DEFAULT_NODE_WIDTH),
    canvasCtx.measureText(title).width,
  );
  return Math.ceil(canvasCtx.measureText(title).width / DEFAULT_NODE_WIDTH);
};

export const getFieldYPosition = (fieldIndex: number, title?: string) => {
  const headerLines = getHeaderLines(title);
  const headerHeight = DEFAULT_NODE_HEADER_LINE_HEIGHT * headerLines + 2 * DEFAULT_NODE_HEADER_VERTICAL_PADDING;
  return headerHeight + DEFAULT_FIELD_PADDING + 2 + fieldIndex * DEFAULT_FIELD_HEIGHT;
};

export const getNodeWidth = <N extends Pick<BaseNode, 'measured'> | Pick<InternalNode, 'width'>>(node: N) => {
  if ('width' in node && typeof node.width === 'number') return node.width;
  if ('measured' in node && node.measured?.width) return node.measured.width;
  return DEFAULT_NODE_WIDTH;
};
