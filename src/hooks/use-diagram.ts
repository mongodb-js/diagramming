import { useReactFlow, type ReactFlowInstance } from '@xyflow/react';

import type { InternalEdge, InternalNode } from '@/types/internal';

export type DiagramInstance = ReactFlowInstance<InternalNode, InternalEdge>;
export function useDiagram() {
  return useReactFlow<InternalNode, InternalEdge>();
}
