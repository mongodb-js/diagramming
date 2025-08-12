import {
  addNodesWithinBounds,
  FIRST_NODE_POSITION,
  getCoordinatesForNewNode,
} from '@/utilities/add-nodes-within-bounds';
import type { NodeProps } from '@/types';

import { DEFAULT_NODE_SPACING } from './constants';

describe('add-nodes-within-bounds', () => {
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
    const result = addNodesWithinBounds(newNodes, []);
    expect(result).toEqual(newNodes);
  });

  describe('With 1 existing node and measures', () => {
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
    const expectedPosition1 = {
      // one row below the existing node
      x: nodes[0].position.x,
      y: nodes[0].position.y + DEFAULT_NODE_SPACING + (nodes[0]?.measured?.height || 0),
    };
    const expectedPosition2 = {
      // one row below the first new node
      x: expectedPosition1.x,
      y: expectedPosition1.y + DEFAULT_NODE_SPACING + (newNodes[0]?.measured?.height || 0),
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

  describe('With multiple existing nodes, with measures', () => {
    const nodes: NodeProps[] = [
      {
        title: 'orders',
        fields: [],
        type: 'collection',
        id: '1',
        measured: {
          height: 100,
          width: 300,
        },
        position: {
          x: 12,
          y: 12,
        },
      },
      {
        title: 'customers',
        fields: [],
        type: 'collection',
        id: '1',
        measured: {
          height: 150,
          width: 300,
        },
        position: {
          x: 412,
          y: 12,
        },
      },
    ];
    const expectedPosition1 = {
      // one row below the existing nodes
      x: nodes[0].position.x,
      y: nodes[0].position.y + DEFAULT_NODE_SPACING + 150, // height of the taller existing node
    };
    const expectedPosition2 = {
      // to the right of the first new node
      x: expectedPosition1.x + DEFAULT_NODE_SPACING + (newNodes[0]?.measured?.width || 0),
      y: expectedPosition1.y,
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

  describe('With no existing nodes, with measures', () => {
    const expectedPosition = {
      // in the initial position
      ...FIRST_NODE_POSITION,
    };
    const expectedPosition2 = {
      // one row below the first new node
      x: expectedPosition.x,
      y: expectedPosition.y + DEFAULT_NODE_SPACING + (newNodes[0]?.measured?.height || 0),
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
      // in the initial position
      ...FIRST_NODE_POSITION,
    };
    const expectedPosition2 = {
      // one row below the first new node
      x: expectedPosition.x,
      y: expectedPosition.y + DEFAULT_NODE_SPACING + 46,
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
