import { Edge as ReactFlowEdge } from '@xyflow/react';

export type BaseEdgeProps = Pick<ReactFlowEdge, 'id' | 'type' | 'source' | 'target' | 'hidden' | 'selected'>;

export type Marker = 'one' | 'many' | 'oneOrMany';

export interface Edge extends BaseEdgeProps {
  markerStart: Marker;
  markerEnd: Marker;
}
