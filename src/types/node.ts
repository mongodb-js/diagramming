import { Node as ReactFlowNode } from '@xyflow/react';

import { NodeData } from '@/types/internal';

export type BaseNodeProps = Pick<
  ReactFlowNode<{}, NodeType>,
  'id' | 'type' | 'position' | 'hidden' | 'draggable' | 'connectable' | 'selected' | 'style' | 'className' | 'measured'
>;
export type NodeType = 'table' | 'collection';
export type NodeBorderVariant = 'subtle' | 'preview' | 'selected' | 'none';
export type NodeFieldVariant = 'disabled' | 'preview' | 'primary' | 'default';
export type NodeFieldHoverVariant = 'none' | 'default';
export type NodeGlyph = 'key' | 'link';

export interface NodeField {
  name: string;
  type?: string;
  depth?: number;
  glyphs?: Array<NodeGlyph>;
  variant?: NodeFieldVariant;
  hoverVariant?: NodeFieldHoverVariant;
}

export type NodeProps = BaseNodeProps & NodeData;
