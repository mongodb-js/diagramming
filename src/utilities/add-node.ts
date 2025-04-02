import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_SPACING, DEFAULT_NODE_WIDTH } from '@/utilities/constants';
import { BaseNode } from '@/types/layout';

export const addNodes = <N extends BaseNode>(nodes: N[], newNodes: N[]) => {
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
