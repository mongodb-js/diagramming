import { InternalNode } from '@/types/internal';
import { NodeType } from '@/types';
import { convertToExternalNode, convertToExternalNodes } from '@/utilities/convert-nodes';

describe('convert-nodes', () => {
  describe('convertToExternalNode', () => {
    it('Should convert nodes', () => {
      const internalNode: InternalNode = {
        id: 'node-1',
        type: 'collection',
        position: { x: 100, y: 200 },
        data: {
          title: 'some-title',
          fields: [],
        },
      };

      const result = convertToExternalNode(internalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'collection' as NodeType,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
      });
    });
  });

  describe('convertToExternalNodes', () => {
    it('should convert an array of internal nodes', () => {
      const internalNodes: InternalNode[] = [
        {
          id: 'n1',
          type: 'collection',
          position: { x: 0, y: 0 },
          data: { title: 'Node 1', fields: [] },
        },
        {
          id: 'n2',
          type: 'table',
          position: { x: 10, y: 10 },
          data: { title: 'Node 2', fields: [] },
        },
      ];

      const result = convertToExternalNodes(internalNodes);
      expect(result).toEqual([
        {
          id: 'n1',
          type: 'collection',
          title: 'Node 1',
          position: { x: 0, y: 0 },
          fields: [],
        },
        {
          id: 'n2',
          type: 'table',
          title: 'Node 2',
          position: { x: 10, y: 10 },
          fields: [],
        },
      ]);
    });
  });
});
