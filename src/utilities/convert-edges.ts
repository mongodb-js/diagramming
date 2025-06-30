import { InternalEdge } from '@/types/internal';
import { EdgeProps, Marker } from '@/types';

export const convertToExternalEdge = (edge: InternalEdge): EdgeProps => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { markerStart, markerEnd, type, ...rest } = edge;
  return {
    ...rest,
    markerStart: markerStart?.replace(/^start-/, '') as Marker,
    markerEnd: markerEnd?.replace(/^end-/, '') as Marker,
  };
};

export const convertToExternalEdges = (edges: InternalEdge[]): EdgeProps[] => {
  return edges.map(edge => convertToExternalEdge(edge));
};

export const convertToInternalEdge = (edge: EdgeProps): InternalEdge => {
  return {
    ...edge,
    markerStart: `start-${edge.markerStart}`,
    markerEnd: `end-${edge.markerEnd}`,
    type: edge.source === edge.target ? 'selfReferencingEdge' : 'floatingEdge',
  };
};

export const convertToInternalEdges = (edges: EdgeProps[]): InternalEdge[] => {
  return edges.map(edge => convertToInternalEdge(edge));
};
