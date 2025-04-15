import { useMemo } from 'react';

import { Edge, Node as ExternalNode } from '@/types';
import { InternalNode } from '@/types/internal';

export const useCanvas = (externalNodes: ExternalNode[], externalEdges: Edge[]) => {
  const initialNodes: InternalNode[] = useMemo(
    () =>
      externalNodes.map(node => {
        const { title, fields, borderVariant, ...rest } = node;
        return {
          ...rest,
          data: {
            title,
            fields,
            borderVariant,
          },
        };
      }),
    [externalNodes],
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      externalEdges.map(edge => ({
        ...edge,
        type: edge.source === edge.target ? 'selfReferencingEdge' : 'floatingEdge',
      })),
    [externalEdges],
  );

  return {
    initialNodes,
    initialEdges,
  };
};
