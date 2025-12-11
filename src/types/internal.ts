import { Node as ReactFlowNode } from '@xyflow/react';

import { FieldId, NodeBorderVariant, NodeField, NodeProps, NodeVariant } from '@/types/node';
import { EdgeProps } from '@/types/edge';

export type InternalNodeField = NodeField & { hasChildren: boolean };

export type NodeData = {
  title: string;
  disabled?: boolean;
  visibleFields: InternalNodeField[];
  borderVariant?: NodeBorderVariant;
  variant?: NodeVariant;
  externalNode: NodeProps;
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
