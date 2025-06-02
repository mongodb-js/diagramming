import { InternalEdge } from '@/types/internal';
import { EdgeProps, Marker } from '@/types';

export const convertToExternalEdge = (edge: InternalEdge): EdgeProps => {
  const { markerStart, markerEnd, ...rest } = edge;
  return {
    ...rest,
    markerStart: markerStart?.replace(/^start-/, '') as Marker,
    markerEnd: markerEnd?.replace(/^end-/, '') as Marker,
  };
};

export const convertToExternalEdges = (edges: InternalEdge[]): EdgeProps[] => {
  return edges.map(edge => convertToExternalEdge(edge));
};
