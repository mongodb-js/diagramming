import { useMemo } from 'react';
import { InternalNode, Node as ExternalNode } from '@/types';

export const useCanvas = (externalNodes: ExternalNode[]) => {
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

  return {
    initialNodes,
  };
};
