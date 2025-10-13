import { ElkExtendedEdge } from 'elkjs';
import ELK from 'elkjs/lib/elk.bundled';

import { DEFAULT_NODE_SPACING, DEFAULT_NODE_STAR_SPACING } from '@/utilities/constants';
import { ApplyLayout, BaseEdge, BaseNode, LayoutDirection } from '@/types/layout';

import { getNodeHeight, getNodeWidth } from './node-dimensions';

const TOP_BOTTOM = {
  'elk.algorithm': 'layered',
  'elk.direction': 'UP',
  'elk.contentAlignment': 'V_CENTER',
  'spacing.nodeNode': `${DEFAULT_NODE_SPACING}`,
  'spacing.nodeNodeBetweenLayers': `${DEFAULT_NODE_SPACING}`,
};

const LEFT_RIGHT = {
  ...TOP_BOTTOM,
  'elk.direction': 'LEFT',
};

const STAR = {
  'elk.algorithm': 'force',
  'spacing.nodeNode': `${DEFAULT_NODE_STAR_SPACING}`,
};

const RECTANGLE = {
  'elk.algorithm': 'box',
  'elk.padding': '12',
  'spacing.nodeNode': `${DEFAULT_NODE_SPACING}`,
};

const getLayoutOptions = (direction: LayoutDirection): Record<string, string> => {
  switch (direction) {
    case 'LEFT_RIGHT':
      return LEFT_RIGHT;
    case 'TOP_BOTTOM':
      return TOP_BOTTOM;
    case 'STAR':
      return STAR;
    case 'RECTANGLE':
      return RECTANGLE;
    default:
      return {};
  }
};

/**
 * Applies a layout to a graph of nodes using the ELK layout engine.
 * When no edges are provided, defaults to RECTANGLE layout for grid arrangement.
 *
 * @param nodes A list of nodes.
 */
export function applyLayout<N extends BaseNode>(nodes: N[]): Promise<ApplyLayout<N, never>>;

/**
 * Applies a layout to a graph of nodes and edges using the ELK layout engine.
 * When edges array is empty, defaults to RECTANGLE layout. When edges are present,
 * directional layouts (LEFT_RIGHT, TOP_BOTTOM, STAR) are available.
 *
 * @param nodes A list of nodes.
 * @param edges A list of edges.
 * @param direction The layout direction to use.
 */
export function applyLayout<N extends BaseNode, E extends BaseEdge>(
  nodes: N[],
  edges: E[],
  direction?: LayoutDirection,
): Promise<ApplyLayout<N, E>>;

export function applyLayout<N extends BaseNode, E extends BaseEdge>(
  nodes: N[],
  edges?: E[],
  direction?: LayoutDirection,
): Promise<ApplyLayout<N, E>> {
  // If no edges are provided, use RECTANGLE layout for grid arrangement
  // Otherwise, use the specified direction or default to TOP_BOTTOM
  const layoutOptions = typeof edges === 'undefined' ? 'RECTANGLE' : (direction ?? 'TOP_BOTTOM');
  const transformedNodes = nodes.map<N>(node => ({
    ...node,
    height: getNodeHeight(node),
    width: getNodeWidth(node),
  }));

  const transformedEdges = (edges ?? []).map<ElkExtendedEdge>(edge => ({
    ...edge,
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
  }));

  const existingNodes: Record<string, N> = nodes.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});
  const existingEdges: Record<string, E> = (edges || []).reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});

  const elk = new ELK({});

  return elk
    .layout({
      id: 'root',
      children: transformedNodes,
      layoutOptions: getLayoutOptions(layoutOptions),
      edges: transformedEdges,
    })
    .then(g => {
      if (!g) return { nodes: [], edges: [] };

      return {
        nodes:
          (g.children ?? []).map<N>(node => ({
            ...existingNodes[node.id],
            position: {
              x: node.x ?? 0,
              y: node.y ?? 0,
            },
          })) ?? [],
        edges: (g.edges ?? []).map<E>(edge => ({
          ...existingEdges[edge.id],
          source: edge.sources?.[0],
          target: edge.targets?.[0],
        })),
      };
    });
}
