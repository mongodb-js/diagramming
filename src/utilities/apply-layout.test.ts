import { applyLayout } from '@/utilities/apply-layout';
import { Edge, Node } from '@/types';

describe('apply-layout', () => {
  it('With no nodes or edges', async () => {
    const result = await applyLayout<Node, Edge>([], [], 'TB');
    expect(result).toEqual({
      nodes: [],
      edges: [],
    });
  });
  it('With nodes', async () => {
    const nodes: Node[] = [
      {
        title: 'orders',
        fields: [],
        type: 'collection',
        id: '1',
        position: {
          x: 12,
          y: 12,
        },
      },
      {
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        position: {
          x: 200,
          y: 200,
        },
      },
      {
        title: 'products',
        fields: [],
        type: 'collection',
        id: '3',
        position: {
          x: 300,
          y: 300,
        },
      },
    ];
    const result = await applyLayout<Node, Edge>(nodes, [], 'TB');
    expect(result.nodes).toEqual([
      expect.objectContaining({
        title: 'orders',
        fields: [],
        type: 'collection',
        id: '1',
        position: {
          x: 12,
          y: 12,
        },
      }),
      expect.objectContaining({
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        position: {
          x: 12,
          y: 32,
        },
      }),
      expect.objectContaining({
        title: 'products',
        fields: [],
        type: 'collection',
        id: '3',
        position: {
          x: 12,
          y: 52,
        },
      }),
    ]);
  });
  it('With nodes and edges', async () => {
    const nodes: Node[] = [
      {
        title: 'orders',
        fields: [],
        type: 'collection',
        id: '1',
        position: {
          x: 12,
          y: 12,
        },
      },
      {
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        position: {
          x: 200,
          y: 200,
        },
      },
      {
        title: 'products',
        fields: [],
        type: 'collection',
        id: '3',
        position: {
          x: 300,
          y: 300,
        },
      },
    ];

    const edges: Edge[] = [
      {
        id: '1',
        source: '3',
        target: '1',
        markerEnd: 'one',
        markerStart: 'many',
      },
    ];

    const result = await applyLayout<Node, Edge>(nodes, edges, 'TB');
    expect(result.edges).toEqual([
      expect.objectContaining({
        id: '1',
        source: '3',
        target: '1',
        markerEnd: 'one',
        markerStart: 'many',
      }),
    ]);
    expect(result.nodes).toEqual([
      expect.objectContaining({
        title: 'orders',
        fields: [],
        type: 'collection',
        id: '1',
        position: {
          x: 12,
          y: 12,
        },
      }),
      expect.objectContaining({
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        position: {
          x: 12,
          y: 132,
        },
      }),
      expect.objectContaining({
        title: 'products',
        fields: [],
        type: 'collection',
        id: '3',
        position: {
          x: 12,
          y: 112,
        },
      }),
    ]);
  });
});
