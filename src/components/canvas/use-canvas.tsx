import { useMemo } from 'react';

import { Edge, Node as ExternalNode } from '@/types';
import { InternalEdge, InternalNode } from '@/types/internal';

export const useCanvas = (externalNodes: ExternalNode[], externalEdges: Edge[]) => {
  const initialNodes: InternalNode[] = useMemo(
    () =>
      externalNodes.map(node => {
        const { title, fields, borderVariant, disabled, ...rest } = node;
        return {
          ...rest,
          draggable: !disabled,
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
        markerStart: `start-${edge.markerStart}`,
        markerEnd: `end-${edge.markerEnd}`,
        type: edge.source === edge.target ? 'selfReferencingEdge' : 'floatingEdge',
      })),
    [externalEdges],
  );

  return {
    initialNodes,
    initialEdges,
  };
};
