import { InternalEdge } from '@/types/internal';
import { EdgeProps, Marker } from '@/types';

export const convertToExternalEdge = (edge: InternalEdge): EdgeProps => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { markerStart, markerEnd, type, data, ...rest } = edge;
  return {
    ...rest,
    markerStart: markerStart?.replace(/^start-/, '') as Marker,
    markerEnd: markerEnd?.replace(/^end-/, '') as Marker,
    ...(data?.sourceFieldIndex !== undefined ? { sourceFieldIndex: data?.sourceFieldIndex } : {}),
    ...(data?.targetFieldIndex !== undefined ? { targetFieldIndex: data?.targetFieldIndex } : {}),
  };
};

export const convertToExternalEdges = (edges: InternalEdge[]): EdgeProps[] => {
  return edges.map(edge => convertToExternalEdge(edge));
};

export const convertToInternalEdge = (edge: EdgeProps): InternalEdge => {
  const { sourceFieldIndex, targetFieldIndex, ...edgeProps } = edge;
  return {
    ...edgeProps,
    markerStart: `start-${edge.markerStart}`,
    markerEnd: `end-${edge.markerEnd}`,
    type:
      edge.source === edge.target
        ? 'selfReferencingEdge'
        : sourceFieldIndex !== undefined && targetFieldIndex !== undefined
          ? 'fieldEdge'
          : 'floatingEdge',
    data: {
      ...(sourceFieldIndex ? { sourceFieldIndex } : {}),
      ...(targetFieldIndex ? { targetFieldIndex } : {}),
    },
  };
};

export const convertToInternalEdges = (edges: EdgeProps[]): InternalEdge[] => {
  return edges.map(edge => convertToInternalEdge(edge));
};
