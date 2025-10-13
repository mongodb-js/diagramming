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
  const edges: [EdgeProps, ...EdgeProps[]] = [
    {
      id: '1',
      source: '3',
      target: '1',
      markerEnd: 'one',
      markerStart: 'many',
    },
  ];
  it('With no nodes or edges', async () => {
    const result = await applyLayout<NodeProps>({ nodes: [] });
    expect(result).toEqual({
      nodes: [],
      edges: [],
    });
  });
  it('With nodes (not measured, 0 fields)', async () => {
    const result = await applyLayout<NodeProps>({ nodes });
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...nodes[0],
        position: {
          x: 15,
          y: 15,
        },
      }),
      expect.objectContaining({
        ...nodes[1],
        position: {
          x: 15,
          y: 161, // 15 + 44 (0 fields height) + 100 (spacing) + 2 (extra padding)
        },
      }),
      expect.objectContaining({
        ...nodes[2],
        position: {
          x: 15,
          y: 307, // 161 + 44 (0 fields height) + 100 (spacing) + 2 (extra padding)
        },
      }),
    ]);
  });
  it('With nodes (not measured, 1 field)', async () => {
    const nodesWithOneField = nodes.map(node => ({
      ...node,
      fields: [{ name: 'field1', type: 'string' }],
    }));
    const result = await applyLayout<NodeProps>({ nodes: nodesWithOneField });
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...nodesWithOneField[0],
        position: {
          x: 15,
          y: 15,
        },
      }),
      expect.objectContaining({
        ...nodesWithOneField[1],
        position: {
          x: 15,
          y: 179, // 15 + 62 (1 field height) + 100 (spacing) + 2 (extra padding)
        },
      }),
      expect.objectContaining({
        ...nodesWithOneField[2],
        position: {
          x: 15,
          y: 343, // 179 + 62 (1 field height) + 100 (spacing) + 2 (extra padding)
        },
      }),
    ]);
  });
  it('With nodes (not measured, undefined fields)', async () => {
    const baseNodes = nodes.map(node => ({
      ...node,
      fields: undefined,
    }));
    const result = await applyLayout<BaseNode>({ nodes: baseNodes });
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...baseNodes[0],
        position: {
          x: 15,
          y: 15,
        },
      }),
      expect.objectContaining({
        ...baseNodes[1],
        position: {
          x: 15,
          y: 179, // 15 + 62 (default height) + 100 (spacing) + 2 (extra padding)
        },
      }),
      expect.objectContaining({
        ...baseNodes[2],
        position: {
          x: 15,
          y: 343, // 179 + 62 (default height) + 100 (spacing) + 2 (extra padding)
        },
      }),
    ]);
  });
  it('With nodes (measured)', async () => {
    const measuredNodes = nodes.map(node => ({
      ...node,
      measured: {
        width: 200,
        height: 50,
      },
    }));
    const result = await applyLayout<NodeProps>({ nodes: measuredNodes });
    expect(result.nodes).toEqual([
      expect.objectContaining({
        ...measuredNodes[0],
        position: {
          x: 15,
          y: 15,
        },
      }),
      expect.objectContaining({
        ...measuredNodes[1],
        position: {
          x: 15,
          y: 165, // 15 + 50 (measured node height) + 100 (spacing)
        },
      }),
      expect.objectContaining({
        ...measuredNodes[2],
        position: {
          x: 15,
          y: 315, // 165 + 50 (measured node height) + 100 (spacing)
        },
      }),
    ]);
  });
  it('With nodes and edges', async () => {
    const result = await applyLayout<NodeProps, EdgeProps>({ nodes, edges, direction: 'TOP_BOTTOM' });
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
          y: 78,
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
          y: 224,
        },
      }),
    ]);
  });
});
