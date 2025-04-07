import { Node as ReactFlowNode } from '@xyflow/react';

import { NodeBorderVariant, NodeField } from '@/types/node';

export type NodeData = {
  title: string;
  fields: Array<NodeField>;
  borderVariant?: NodeBorderVariant;
};
export type InternalNode = ReactFlowNode<NodeData>;
