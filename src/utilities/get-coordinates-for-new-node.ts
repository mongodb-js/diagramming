import { DEFAULT_NODE_SPACING } from '@/utilities/constants';
import type { BaseNode } from '@/types/layout';

import { getNodeHeight, getNodeWidth } from './node-dimensions';

/**
 * Get coordinates for a new node, positioning it in a grid pattern.
 *
 * This function takes maximum width and height of the existing nodes
 * and then finds place for a new one.
 *
 * The node is positioned such that it fits within the maximum width of the existing nodes,
 * and when the width is exceeded, it wraps to the next row.
 *
 * @param nodes A list of existing nodes, used to calculate the bounds of the diagram.
 * @param newNode A new node to add within the bounds of the diagram.
 */
export const getCoordinatesForNewNodeFromMaxDimensions = <N extends BaseNode>({
  maxWidth,
  maxHeight,
  newNode,
}: {
  newNode: N;
  maxWidth: number;
  maxHeight: number;
}) => {
  const newNodeWidth = getNodeWidth(newNode);
  const newNodeHeight = getNodeHeight(newNode);

  let x = 0;
  let y = maxHeight + DEFAULT_NODE_SPACING;
  let rowHeight = 0;

  if (x + newNodeWidth + DEFAULT_NODE_SPACING > maxWidth) {
    x = 0;
    y += rowHeight + DEFAULT_NODE_SPACING;
    rowHeight = 0;
  }

  x += newNodeWidth + DEFAULT_NODE_SPACING;
  rowHeight = Math.max(rowHeight, newNodeHeight);

  return { x, y };
};

/**
 * Get coordinates for a new node, positioning it in a grid pattern.
 *
 * This function calculates the maximum width and height of the existing nodes
 * and then finds a place for the new node.
 *
 * The node is positioned such that it fits within the maximum width of the existing nodes,
 * and when the width is exceeded, it wraps to the next row.
 *
 * @param nodes A list of existing nodes, used to calculate the bounds of the diagram.
 * @param newNode A new node to add within the bounds of the diagram.
 */
export const getCoordinatesForNewNode = <N extends BaseNode>(nodes: N[], newNode: N): { x: number; y: number } => {
  if (nodes.length === 0) {
    return { x: DEFAULT_NODE_SPACING, y: DEFAULT_NODE_SPACING };
  }

  const maxWidth = Math.max(...nodes.map(node => getNodeWidth(node))) + DEFAULT_NODE_SPACING;
  const maxHeight = Math.max(...nodes.map(node => getNodeHeight(node))) + DEFAULT_NODE_SPACING;

  return getCoordinatesForNewNodeFromMaxDimensions({
    newNode,
    maxWidth,
    maxHeight,
  });
};
