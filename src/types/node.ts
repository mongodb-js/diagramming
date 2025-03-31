import { Node as ReactFlowNode } from '@xyflow/react';

type BaseNodeProps = Pick<
  ReactFlowNode,
  'id' | 'type' | 'position' | 'hidden' | 'draggable' | 'selected' | 'style' | 'className'
>;

type NodeFieldVariant = 'dimmed' | 'preview' | 'default';
type NodeGlyph = 'key' | 'link';

export interface NodeField {
  name: string;
  type?: string;
  depth?: number;
  glyphs?: NodeGlyph;
  variant?: NodeFieldVariant;
}

export interface Node extends BaseNodeProps {
  title: string;
  fields: Array<NodeField>;
  borderVariant?: string;
}
