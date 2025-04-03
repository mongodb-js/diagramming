import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_SPACING, DEFAULT_NODE_WIDTH } from '@/utilities/constants';
import { BaseNode } from '@/types/layout';

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
  const maxWidth = Math.max(0, ...nodes.map(n => n.position.x + (n.measured?.width || DEFAULT_NODE_WIDTH)));
  const maxHeight = Math.max(0, ...nodes.map(n => n.position.y + (n.measured?.height || DEFAULT_NODE_HEIGHT)));

  let x = 0;
  let y = maxHeight + DEFAULT_NODE_SPACING;
  let rowHeight = 0;

  return [
    ...nodes,
    ...newNodes.map(n => {
      if (!n.measured || !n.measured.height || !n.measured.width) return n;

      if (x + n.measured.width + DEFAULT_NODE_SPACING > maxWidth) {
        x = 0;
        y += rowHeight + DEFAULT_NODE_SPACING;
        rowHeight = 0;
      }

      x += n.measured.width + DEFAULT_NODE_SPACING;
      rowHeight = Math.max(rowHeight, n.measured.height);

      return { ...n, position: { x, y } };
    }),
  ];
};
