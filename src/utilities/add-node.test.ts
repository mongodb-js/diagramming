import { addNodes } from '@/utilities/add-node';
import { Node } from '@/types';

describe('add-node', () => {
  const nodes: Node[] = [
    {
      title: 'orders',
      fields: [],
      height: 100,
      width: 244,
      type: 'collection',
      id: '1',
      position: {
        x: 12,
        y: 12,
      },
    },
  ];
  it('With no new nodes', () => {
    const result = addNodes(nodes, []);
    expect(result).toEqual(nodes);
  });
  it('With no existing nodes', () => {
    const result = addNodes([], nodes);
    expect(result).toEqual([
      {
        title: 'orders',
        fields: [],
        height: 100,
        width: 244,
        type: 'collection',
        id: '1',
        position: {
          x: 0,
          y: 200,
        },
      },
    ]);
  });
  it('With existing nodes', () => {
    const newNodes: Node[] = [
      {
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        height: 100,
        width: 244,
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
        height: 100,
        width: 244,
        position: {
          x: 300,
          y: 300,
        },
      },
    ];
    const result = addNodes(nodes, newNodes);
    expect(result).toEqual([
      ...nodes,
      {
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '2',
        height: 100,
        width: 244,
        position: {
          x: 0,
          y: 312,
        },
      },
      {
        title: 'products',
        fields: [],
        type: 'collection',
        id: '3',
        height: 100,
        width: 244,
        position: {
          x: 0,
          y: 512,
        },
      },
    ]);
  });
});
