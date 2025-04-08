import { Node as ReactFlowNode } from '@xyflow/react';

import { NodeData } from '@/types/internal';

export type BaseNodeProps = Pick<
  ReactFlowNode<{}, NodeType>,
  'id' | 'type' | 'position' | 'hidden' | 'draggable' | 'selected' | 'style' | 'className' | 'measured'
>;
export type NodeType = 'table' | 'collection' | 'connectable';
export type NodeBorderVariant = 'subtle' | 'preview' | 'selected' | 'none';
export type NodeFieldVariant = 'dimmed' | 'preview' | 'default';
export type NodeGlyph = 'key' | 'link';

export interface NodeField {
  name: string;
  type?: string;
  depth?: number;
  glyphs?: NodeGlyph;
  variant?: NodeFieldVariant;
}

export type Node = BaseNodeProps & NodeData;
