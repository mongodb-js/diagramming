import { useMemo } from 'react';

import { EdgeProps, NodeProps as ExternalNode } from '@/types';
import { InternalEdge, InternalNode } from '@/types/internal';

export const useCanvas = (externalNodes: ExternalNode[], externalEdges: EdgeProps[]) => {
  const initialNodes: InternalNode[] = useMemo(
    () =>
      externalNodes.map(node => {
        const { title, fields, borderVariant, disabled, connectable, ...rest } = node;
        return {
          ...rest,
          draggable: !disabled,
          connectable: connectable || false,
          data: {
            title,
            disabled,
            fields,
            borderVariant,
          },
        };
      }),
    [externalNodes],
  );

  const initialEdges: InternalEdge[] = useMemo(
    () =>
      externalEdges.map(edge => ({
        ...edge,
        markerStart: edge.markerStart ? `start-${edge.markerStart}` : undefined,
        markerEnd: edge.markerEnd ? `end-${edge.markerEnd}` : undefined,
        type: edge.source === edge.target ? 'selfReferencingEdge' : 'floatingEdge',
      })),
    [externalEdges],
  );

  return {
    initialNodes,
    initialEdges,
  };
};
