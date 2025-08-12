import { addNodesWithinBounds, getCoordinatesForNewNode } from '@/utilities/add-nodes-within-bounds';
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
        x: 10,
        y: 10, // This will be recalculated
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
        x: 10,
        y: 10, // This will be recalculated
      },
    },
  ];

  it('With no new nodes', () => {
    const result = addNodesWithinBounds(nodes, []);
    expect(result).toEqual(nodes);
  });

  describe('With existing nodes and measures', () => {
    const expectedPosition1 = {
      x: 344,
      y: 312,
    };
    const expectedPosition2 = {
      x: 344,
      y: 512,
    };
    it('addNodesWithinBounds', () => {
      const result = addNodesWithinBounds(nodes, newNodes);
      expect(result).toEqual([
        ...nodes,
        {
          ...newNodes[0],
          position: expectedPosition1,
        },
        {
          ...newNodes[1],
          position: expectedPosition2,
        },
      ]);
    });
    it('getCoordinatesForNewNode', () => {
      const result = getCoordinatesForNewNode(nodes, newNodes[0]);
      expect(result).toEqual(expectedPosition1);
    });
  });

  describe('With no existing nodes', () => {
    const expectedPosition = {
      x: 344,
      y: 200,
    };
    const expectedPosition2 = {
      x: 344,
      y: 400,
    };

    it('addNodesWithinBounds', () => {
      const result = addNodesWithinBounds([] as NodeProps[], newNodes);
      expect(result).toEqual([
        {
          ...newNodes[0],
          position: expectedPosition,
        },
        {
          ...newNodes[1],
          position: expectedPosition2,
        },
      ]);
    });

    it('getCoordinatesForNewNode', () => {
      const result = getCoordinatesForNewNode([] as NodeProps[], newNodes[0]);
      expect(result).toEqual(expectedPosition);
    });
  });

  describe('With no existing nodes and no measured dimensions', () => {
    const newNotMeasuredNodes: Omit<NodeProps, 'position'>[] = newNodes.map(node => ({
      ...node,
      measured: undefined,
    }));
    const expectedPosition = {
      x: 344,
      y: 200,
    };
    const expectedPosition2 = {
      x: 344,
      y: 346,
    };
    it('addNodesWithinBounds', () => {
      const result = addNodesWithinBounds([] as NodeProps[], newNotMeasuredNodes);
      expect(result).toEqual([
        {
          ...newNotMeasuredNodes[0],
          position: expectedPosition,
        },
        {
          ...newNotMeasuredNodes[1],
          position: expectedPosition2,
        },
      ]);
    });

    it('getCoordinatesForNewNode', () => {
      const result = getCoordinatesForNewNode([], newNotMeasuredNodes[0]);
      expect(result).toEqual(expectedPosition);
    });
  });
});
