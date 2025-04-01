import { ElkExtendedEdge } from 'elkjs';
import ELK from 'elkjs/lib/elk.bundled';
import { DEFAULT_NODE_SPACING, DEFAULT_NODE_STAR_SPACING } from '@/utilities/constants';
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
    case 'LR':
      return LEFT_RIGHT;
    case 'TB':
      return TOP_BOTTOM;
    case 'S':
      return STAR;
    default:
      return {};
  }
};

export const applyLayout = <N extends BaseNode, E extends BaseEdge>(
  nodes: N[],
  edges: E[],
  direction: LayoutDirection,
): Promise<ApplyLayout<N, E>> => {
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
      children: nodes,
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
