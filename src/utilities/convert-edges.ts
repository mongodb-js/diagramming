import { InternalEdge } from '@/types/internal';
import { EdgeProps, Marker } from '@/types';

export const convertToExternalEdge = (edge: InternalEdge): EdgeProps => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { markerStart, markerEnd, type, data, ...rest } = edge;
  return {
    ...rest,
    markerStart: markerStart?.replace(/^start-/, '') as Marker,
    markerEnd: markerEnd?.replace(/^end-/, '') as Marker,
    ...(data?.sourceFieldId !== undefined ? { sourceFieldId: data?.sourceFieldId } : {}),
    ...(data?.targetFieldId !== undefined ? { targetFieldId: data?.targetFieldId } : {}),
  };
};

export const convertToExternalEdges = (edges: InternalEdge[]): EdgeProps[] => {
  return edges.map(edge => convertToExternalEdge(edge));
};

export const convertToInternalEdge = (edge: EdgeProps): InternalEdge => {
  const { sourceFieldId, targetFieldId, ...edgeProps } = edge;
  return {
    ...edgeProps,
    markerStart: `start-${edge.markerStart}`,
    markerEnd: `end-${edge.markerEnd}`,
    type:
      edge.source === edge.target
        ? 'selfReferencingEdge'
        : sourceFieldId !== undefined && targetFieldId !== undefined
          ? 'fieldEdge'
          : 'floatingEdge',
    data: {
      ...(sourceFieldId !== undefined ? { sourceFieldId } : {}),
      ...(targetFieldId !== undefined ? { targetFieldId } : {}),
    },
  };
};

export const convertToInternalEdges = (edges: EdgeProps[]): InternalEdge[] => {
  return edges.map(edge => convertToInternalEdge(edge));
};
