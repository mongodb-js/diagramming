import { Node as ReactFlowNode } from '@xyflow/react';

import { NodeBorderVariant, NodeField } from '@/types/node';
import { EdgeProps } from '@/types/edge';

export type NodeData = {
  title: string;
  disabled?: boolean;
  fields: NodeField[];
  borderVariant?: NodeBorderVariant;
};

export type InternalNode = ReactFlowNode<NodeData>;

export interface InternalEdge extends Omit<EdgeProps, 'markerStart' | 'markerEnd'> {
  markerStart: 'start-one' | 'start-oneOrMany' | 'start-many';
  markerEnd: 'end-one' | 'end-oneOrMany' | 'end-many';
}
