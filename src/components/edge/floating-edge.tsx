import { EdgeProps, getSmoothStepPath, useNodes, BaseEdge } from '@xyflow/react';
import { useMemo } from 'react';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';

import { getEdgeParams } from '@/utilities/get-edge-params';
import { InternalNode } from '@/types/internal';

const Edge = styled(BaseEdge)`
  stroke: ${palette.gray.base};
`;

export const FloatingEdge = ({ id, source, target, markerEnd, markerStart }: EdgeProps) => {
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
    <Edge data-testid={`floating-edge-${id}`} markerEnd={markerEnd} markerStart={markerStart} path={path} id={id} />
  );
};
