import { Edge as ReactFlowEdge } from '@xyflow/react';

type BaseEdgeProps = Pick<ReactFlowEdge, 'id' | 'type' | 'source' | 'target' | 'hidden' | 'selected'>;

type Marker = 'one' | 'many' | 'oneOrMany';

export interface Edge extends BaseEdgeProps {
  markerStart: Marker;
  markerEnd: Marker;
}
