import { NodeProps } from '@/types/node';
import { Edge } from '@/types/edge';

export type LayoutDirection = 'LEFT_RIGHT' | 'TOP_BOTTOM' | 'STAR';
export type BaseNode = Pick<NodeProps, 'id' | 'position' | 'measured'>;
export type BaseEdge = Pick<Edge, 'id' | 'source' | 'target' | 'type'>;
export type ApplyLayout<N, E> = {
  nodes: Array<N>;
  edges: Array<E>;
};
