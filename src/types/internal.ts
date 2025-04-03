import { Node as ReactFlowNode } from '@xyflow/react';
import { NodeField } from '@/types/node';

export type NodeData = {
  title: string;
  fields: Array<NodeField>;
  borderVariant?: string;
};
export type InternalNode = ReactFlowNode<NodeData>;
