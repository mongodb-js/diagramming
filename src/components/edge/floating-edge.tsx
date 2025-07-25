import { EdgeProps, getSmoothStepPath, useNodes } from '@xyflow/react';
import { useMemo } from 'react';

import { getEdgeParams } from '@/utilities/get-edge-params';
import { InternalNode } from '@/types/internal';
import { Edge } from '@/components/edge/edge';

export const FloatingEdge = ({ id, source, target, markerEnd, markerStart, selected }: EdgeProps) => {
  const nodes = useNodes<InternalNode>();

  const { sourceNode, targetNode } = useMemo(() => {
    const sourceNode = nodes.find(n => n.id === source);
    const targetNode = nodes.find(n => n.id === target);
    return { sourceNode, targetNode };
  }, [nodes, source, target]);

  if (!sourceNode || !targetNode) return null;

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [path] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <Edge
      data-testid={`floating-edge-${id}`}
      markerEnd={markerEnd}
      markerStart={markerStart}
      path={path}
      id={id}
      selected={selected}
    />
  );
};
