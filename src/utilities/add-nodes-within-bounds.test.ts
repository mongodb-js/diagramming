import { addNodesWithinBounds } from '@/utilities/add-nodes-within-bounds';
import { NodeProps } from '@/types';

describe('add-nodes-within-bounds', () => {
  const nodes: NodeProps[] = [
    {
      title: 'orders',
      fields: [],
      measured: {
        height: 100,
        width: 244,
      },
      type: 'collection',
      id: '1',
      position: {
        x: 12,
        y: 12,
      },
    },
  ];
  it('With no new nodes', () => {
    const result = addNodesWithinBounds(nodes, []);
    expect(result).toEqual(nodes);
  });
  it('With no existing nodes', () => {
    const result = addNodesWithinBounds([], nodes);
    expect(result).toEqual([
      {
        title: 'orders',
        fields: [],
        measured: {
          height: 100,
          width: 244,
        },
        type: 'collection',
        id: '1',
        position: {
          x: 344,
          y: 200,
        },
      },
    ]);
  });
  it('With existing nodes', () => {
    const newNodes: NodeProps[] = [
      {
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        measured: {
          height: 100,
          width: 244,
        },
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
        measured: {
          height: 100,
          width: 244,
        },
        position: {
          x: 300,
          y: 300,
        },
      },
    ];
    const result = addNodesWithinBounds(nodes, newNodes);
    expect(result).toEqual([
      ...nodes,
      {
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        measured: {
          height: 100,
          width: 244,
        },
        position: {
          x: 344,
          y: 312,
        },
      },
      {
        title: 'products',
        fields: [],
        type: 'collection',
        id: '3',
        measured: {
          height: 100,
          width: 244,
        },
        position: {
          x: 344,
          y: 512,
        },
      },
    ]);
  });
});
