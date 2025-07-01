import { getNodesBounds as originalGetNodesBounds } from '@xyflow/react';

import type { NodeProps } from '@/types';

import { convertToInternalNodes } from './convert-nodes';

type GetNodesBoundsParams = Parameters<typeof originalGetNodesBounds>[1];

export function getNodesBounds(nodes: NodeProps[], params?: GetNodesBoundsParams) {
  const data = convertToInternalNodes(nodes);
  return originalGetNodesBounds(data, params);
}
