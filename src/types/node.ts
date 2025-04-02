import { Node as ReactFlowNode } from '@xyflow/react';

type BaseNodeProps = Pick<
  ReactFlowNode<{}, NodeType>,
  'id' | 'type' | 'position' | 'hidden' | 'draggable' | 'selected' | 'style' | 'className'
>;
type NodeType = 'table' | 'collection';
type NodeFieldVariant = 'dimmed' | 'preview' | 'default';
type NodeGlyph = 'key' | 'link';

export interface NodeField {
  name: string;
  type?: string;
  depth?: number;
  glyphs?: NodeGlyph;
  variant?: NodeFieldVariant;
}

type NodeData = {
  title: string;
  fields: Array<NodeField>;
  borderVariant?: string;
};

export type Node = BaseNodeProps & NodeData;

export type InternalNode = ReactFlowNode<NodeData>; // TODO: Will need to be moved so it isn't exposed externally
