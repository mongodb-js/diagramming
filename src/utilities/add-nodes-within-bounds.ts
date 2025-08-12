import type { BaseNode } from '@/types/layout';

import { getNodeWidth, getNodeHeight } from './node-dimensions';
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_SPACING, DEFAULT_NODE_WIDTH } from './constants';

export const FIRST_NODE_POSITION = {
  x: DEFAULT_NODE_SPACING + DEFAULT_NODE_WIDTH,
  y: DEFAULT_NODE_SPACING + DEFAULT_NODE_HEIGHT,
} as const;

/**
 * Adds new nodes to an existing array of nodes, positioning them in a grid pattern.
 *
 * This function calculates the maximum width and height of the existing nodes and then places the
 * new nodes in a grid-like pattern, utilizing spacing to avoid overlap.
 *
 * Each new node is positioned such that it fits within the maximum width of the existing nodes,
 * and when the width is exceeded, it wraps to the next row.
 *
 * @param nodes A list of existing nodes, used to calculate the bounds of the diagram.
 * @param newNodes A list of new nodes to add within the bounds of the diagram.
 */
export const addNodesWithinBounds = <N extends BaseNode>(nodes: N[], newNodes: Omit<N, 'position'>[]) => {
  return [
    ...nodes,
    ...placeNewNodes({
      nodes,
      newNodes,
    }),
  ];
};

const placeNewNodes = <N extends BaseNode>({ nodes, newNodes }: { nodes: N[]; newNodes: Omit<N, 'position'>[] }) => {
  const maxWidth = Math.max(0, ...nodes.map(n => n.position.x + getNodeWidth(n)));
  const maxHeight = Math.max(0, ...nodes.map(n => n.position.y + getNodeHeight(n)));
  const firstNodeOffsetX = nodes.length ? Math.min(...nodes.map(n => n.position.x)) : FIRST_NODE_POSITION.x;

  let x = maxWidth;
  let y = maxHeight;
  let rowHeight = 0;

  return newNodes.map((newNode, index) => {
    if (nodes.length === 0 && index === 0) {
      // This is the first node
      x = FIRST_NODE_POSITION.x;
      y = FIRST_NODE_POSITION.y;
      rowHeight = getNodeHeight(newNode);
      return {
        ...newNode,
        position: { x, y },
      };
    }
    const newNodeWidth = getNodeWidth(newNode);
    const newNodeHeight = getNodeHeight(newNode);

    if (x + newNodeWidth + DEFAULT_NODE_SPACING > maxWidth) {
      // start a new row
      x = firstNodeOffsetX;
      y += rowHeight + DEFAULT_NODE_SPACING;
      rowHeight = 0;
    } else {
      // continue in the same row
      x += newNodeWidth + DEFAULT_NODE_SPACING;
    }

    rowHeight = Math.max(rowHeight, newNodeHeight);

    return {
      ...newNode,
      position: { x, y },
    };
  });
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
export const getCoordinatesForNewNode = <N extends BaseNode>(
  nodes: N[],
  newNode: Omit<N, 'position'>,
): { x: number; y: number } => {
  const placedNode = placeNewNodes({
    nodes,
    newNodes: [newNode],
  });
  return placedNode[0].position;
};
