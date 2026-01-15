import { Node as ReactFlowNode } from '@xyflow/react';

import { FieldId, NodeBorderVariant, NodeField, NodeVariant } from '@/types/node';
import { EdgeProps } from '@/types/edge';

export type InternalNodeField = NodeField & { hasChildren: boolean; isVisible: boolean };

export type NodeData = {
  title: string;
  disabled?: boolean;
  fields: InternalNodeField[];
  borderVariant?: NodeBorderVariant;
  variant?: NodeVariant;
};

export type InternalNode = ReactFlowNode<NodeData>;

export interface InternalEdge extends Omit<EdgeProps, 'markerStart' | 'markerEnd'> {
  markerStart: 'start-one' | 'start-oneOrMany' | 'start-many';
  markerEnd: 'end-one' | 'end-oneOrMany' | 'end-many';
  type: 'selfReferencingEdge' | 'floatingEdge' | 'fieldEdge';
  data: {
    sourceFieldId?: FieldId;
    targetFieldId?: FieldId;
  };
}
