import { getSmoothStepPath, useNodes } from '@xyflow/react';
import { useMemo } from 'react';

import { getEdgeParams } from '@/utilities/get-field-edge-params';
import { InternalNode } from '@/types/internal';
import { Edge } from '@/components/edge/edge';
import { EdgeProps } from '@/types';

export const FieldEdge = ({ 
  id, source, target, markerEnd, markerStart, selected, sourceField, targetField
}: EdgeProps) => {
  console.log('FieldEdge', { id, source, target, markerEnd, markerStart, selected, sourceField, targetField });
  const nodes = useNodes<InternalNode>();

  const { sourceNode, targetNode } = useMemo(() => {
    const sourceNode = nodes.find(n => n.id === source);
    const targetNode = nodes.find(n => n.id === target);
    return { sourceNode, targetNode };
  }, [nodes, source, target]);

  console.log({ sourceNode, targetNode, sourceField, targetField });
  if (!sourceNode || !targetNode) return null;

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode, sourceField || 'employeeId', targetField || 'employeeId');

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <Edge
      labelX={labelX}
      labelY={labelY}
      data-testid={`field-edge-${id}`}
      markerEnd={markerEnd}
      markerStart={markerStart}
      path={path}
      id={id}
      selected={selected}
    />
  );
};
