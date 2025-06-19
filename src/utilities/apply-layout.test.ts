import { applyLayout } from '@/utilities/apply-layout';
import { BaseNode, EdgeProps, NodeProps } from '@/types';

describe('apply-layout', () => {
  const nodes: NodeProps[] = [
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
  const edges: EdgeProps[] = [
    {
      id: '1',
      source: '3',
      target: '1',
      markerEnd: 'one',
      markerStart: 'many',
    },
  ];
  it('With no nodes or edges', async () => {
    const result = await applyLayout<NodeProps, EdgeProps>([], [], 'TOP_BOTTOM');
    expect(result).toEqual({
      nodes: [],
      edges: [],
    });
  });
  it('With nodes (not measured, 0 fields)', async () => {
    const result = await applyLayout<NodeProps, EdgeProps>(nodes, [], 'TOP_BOTTOM');
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...nodes[0],
        position: {
          x: 12,
          y: 12,
        },
      }),
      expect.objectContaining({
        ...nodes[1],
        position: {
          x: 12,
          y: 76, // 12 + 44 (0 fields height) + 2*10 (padding)
        },
      }),
      expect.objectContaining({
        ...nodes[2],
        position: {
          x: 12,
          y: 140, // 76 + 44 (0 fields height) + 2*10 (padding)
        },
      }),
    ]);
  });
  it('With nodes (not measured, 1 field)', async () => {
    const nodesWithOneField = nodes.map(node => ({
      ...node,
      fields: [{ name: 'field1', type: 'string' }],
    }));
    const result = await applyLayout<NodeProps, EdgeProps>(nodesWithOneField, [], 'TOP_BOTTOM');
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...nodesWithOneField[0],
        position: {
          x: 12,
          y: 12,
        },
      }),
      expect.objectContaining({
        ...nodesWithOneField[1],
        position: {
          x: 12,
          y: 94, // 12 + 62 (1 field height) + 2*10 (padding)
        },
      }),
      expect.objectContaining({
        ...nodesWithOneField[2],
        position: {
          x: 12,
          y: 176, // 94 + 62 (1 field height) + 2*10 (padding)
        },
      }),
    ]);
  });
  it('With nodes (not measured, undefined fields)', async () => {
    const baseNodes = nodes.map(node => ({
      ...node,
      fields: undefined,
    }));
    const result = await applyLayout<BaseNode, EdgeProps>(baseNodes, [], 'TOP_BOTTOM');
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...baseNodes[0],
        position: {
          x: 12,
          y: 12,
        },
      }),
      expect.objectContaining({
        ...baseNodes[1],
        position: {
          x: 12,
          y: 94, // 12 + 62 (default height) + 2*10 (padding)
        },
      }),
      expect.objectContaining({
        ...baseNodes[2],
        position: {
          x: 12,
          y: 176, // 94 + 62 (default height) + 2*10 (padding)
        },
      }),
    ]);
  });
  it('With nodes (measured)', async () => {
    const measuredNodes = nodes.map(node => ({
      ...node,
      measured: {
        width: 100,
        height: 50,
      },
    }));
    const result = await applyLayout<NodeProps, EdgeProps>(measuredNodes, [], 'TOP_BOTTOM');
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...measuredNodes[0],
        position: {
          x: 12,
          y: 12,
        },
      }),
      expect.objectContaining({
        ...measuredNodes[1],
        position: {
          x: 12,
          y: 82, // 12 + 50 (measured node height) + 2*10 (padding)
        },
      }),
      expect.objectContaining({
        ...measuredNodes[2],
        position: {
          x: 12,
          y: 152, // 82 + 50 (measured node height) + 2*10 (padding)
        },
      }),
    ]);
  });
  it('With nodes and edges', async () => {
    const result = await applyLayout<NodeProps, EdgeProps>(nodes, edges, 'TOP_BOTTOM');
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
          y: 76,
        },
      }),
      expect.objectContaining({
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        position: {
          x: 12,
          y: 12,
        },
      }),
      expect.objectContaining({
        title: 'products',
        fields: [],
        type: 'collection',
        id: '3',
        position: {
          x: 12,
          y: 220,
        },
      }),
    ]);
  });
});
