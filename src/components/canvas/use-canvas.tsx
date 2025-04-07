import { useMemo } from 'react';

import { Node as ExternalNode } from '@/types';
import { InternalNode } from '@/types/internal';

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
