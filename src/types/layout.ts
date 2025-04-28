import { NodeProps } from '@/types/node';
import { EdgeProps } from '@/types/edge';

export type LayoutDirection = 'LEFT_RIGHT' | 'TOP_BOTTOM' | 'STAR';
export type BaseNode = Pick<NodeProps, 'id' | 'position' | 'measured'>;
export type BaseEdge = Pick<EdgeProps, 'id' | 'source' | 'target' | 'type'>;
export type ApplyLayout<N, E> = {
  nodes: Array<N>;
  edges: Array<E>;
};
