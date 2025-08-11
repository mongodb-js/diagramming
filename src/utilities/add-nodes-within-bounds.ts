import type { BaseNode } from '@/types/layout';

import { getNodeWidth, getNodeHeight } from './node-dimensions';
import { getCoordinatesForNewNodeFromMaxDimensions } from './get-coordinates-for-new-node';

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
export const addNodesWithinBounds = <N extends BaseNode>(nodes: N[], newNodes: N[]) => {
  const maxWidth = Math.max(0, ...nodes.map(n => n.position.x + getNodeWidth(n)));
  const maxHeight = Math.max(0, ...nodes.map(n => n.position.y + getNodeHeight(n)));

  return [
    ...nodes,
    ...newNodes.map(n => ({
      ...n,
      position: getCoordinatesForNewNodeFromMaxDimensions({ maxWidth, maxHeight, newNode: n }),
    })),
  ];
};
