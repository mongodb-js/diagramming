import { ElkExtendedEdge } from 'elkjs';
import ELK from 'elkjs/lib/elk.bundled';

import {
  DEFAULT_FIELD_HEIGHT,
  DEFAULT_FIELD_PADDING,
  DEFAULT_NODE_HEADER_HEIGHT,
  DEFAULT_NODE_SPACING,
  DEFAULT_NODE_STAR_SPACING,
  DEFAULT_NODE_WIDTH,
} from '@/utilities/constants';
import { ApplyLayout, BaseEdge, BaseNode, LayoutDirection } from '@/types/layout';

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

const getLayoutOptions = (direction: LayoutDirection) => {
  switch (direction) {
    case 'LEFT_RIGHT':
      return LEFT_RIGHT;
    case 'TOP_BOTTOM':
      return TOP_BOTTOM;
    case 'STAR':
      return STAR;
    default:
      return {};
  }
};

const getNodeHeight = <N extends BaseNode>(node: N) => {
  const fieldCount = !('fields' in node) || !Array.isArray(node.fields) ? 1 : node.fields.length;
  return DEFAULT_NODE_HEADER_HEIGHT + DEFAULT_FIELD_PADDING * 2 + fieldCount * DEFAULT_FIELD_HEIGHT;
};

/**
 * Applies a layout to a graph of nodes and edges using the ELK layout engine.
 *
 * This function transforms the provided nodes and edges into a format suitable for the ELK layout algorithm,
 * applies the layout based on the specified direction, and then returns a promise that resolves
 * to the nodes and edges with updated positions.
 *
 * @param nodes A list of nodes.
 * @param edges A list of edges.
 * @param direction The layout direction to use, either "LEFT_RIGHT", "TOP_BOTTOM" or "STAR".
 */
export const applyLayout = <N extends BaseNode, E extends BaseEdge>(
  nodes: N[],
  edges: E[],
  direction: LayoutDirection = 'TOP_BOTTOM',
): Promise<ApplyLayout<N, E>> => {
  const transformedNodes = nodes.map<N>(node => ({
    ...node,
    height:
      'height' in node && typeof node.height === 'number' ? node.height : node.measured?.height ?? getNodeHeight(node),
    width: 'width' in node && typeof node.width === 'number' ? node.width : node.measured?.width ?? DEFAULT_NODE_WIDTH,
  }));

  const transformedEdges = edges.map<ElkExtendedEdge>(edge => ({
    ...edge,
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
  }));

  const existingNodes: Record<string, N> = nodes.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});
  const existingEdges: Record<string, E> = edges.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});

  const elk = new ELK({});

  return elk
    .layout({
      id: 'root',
      children: transformedNodes,
      layoutOptions: getLayoutOptions(direction),
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
};
