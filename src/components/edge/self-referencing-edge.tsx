import { EdgeProps, useNodes } from '@xyflow/react';
import { useMemo } from 'react';
import { path } from 'd3-path';

import { InternalNode } from '@/types/internal';
import { DEFAULT_MARKER_SIZE } from '@/utilities/constants';
import { Edge } from '@/components/edge/edge';
import { getNodeWidth, getNodeHeight } from '@/utilities/node-dimensions';

export const SelfReferencingEdge = ({ id, source, markerEnd, markerStart, selected }: EdgeProps) => {
  const nodes = useNodes<InternalNode>();

  const { sourceNode } = useMemo(() => {
    const sourceNode = nodes.find(n => n.id === source);
    return { sourceNode };
  }, [nodes, source]);

  if (!sourceNode) {
    return null;
  }

  const centerX = getNodeWidth(sourceNode) / 2;
  const centerY = getNodeHeight(sourceNode) / 2;

  const width = centerX + 40;
  const leftHeight = 30;
  const rightHeight = centerY + leftHeight;

  const startX = sourceNode.position.x + centerX;
  const startY = sourceNode.position.y - DEFAULT_MARKER_SIZE / 2;

  const topLeftCornerX = startX;
  const topLeftCornerY = startY - leftHeight;

  const topRightCornerX = startX + width;
  const topRightCornerY = topLeftCornerY;

  const bottomRightCornerX = topRightCornerX;
  const bottomRightCornerY = topRightCornerY + rightHeight;

  const bottomLeftCornerX = topRightCornerX - width + centerX + DEFAULT_MARKER_SIZE / 2;
  const bottomLeftCornerY = bottomRightCornerY;

  const context = path();
  context.moveTo(startX, startY);
  context.lineTo(topLeftCornerX, topLeftCornerY);
  context.lineTo(topRightCornerX, topLeftCornerY);
  context.lineTo(bottomRightCornerX, bottomRightCornerY);
  context.lineTo(bottomLeftCornerX, bottomLeftCornerY);

  return (
    <Edge
      data-testid={`self-referencing-edge-${id}`}
      markerEnd={markerEnd}
      markerStart={markerStart}
      path={context.toString()}
      selected={selected}
      id={id}
    />
  );
};
