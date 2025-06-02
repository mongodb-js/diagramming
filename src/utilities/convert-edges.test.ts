import { InternalEdge } from '@/types/internal';
import { EdgeProps } from '@/types';
import { convertToExternalEdge, convertToExternalEdges } from '@/utilities/convert-edges';

describe('convert-edges', () => {
  describe('convertEdges', () => {
    it('should convert a single internal edge to external by stripping prefixes', () => {
      const internalEdge: InternalEdge = {
        id: 'e1',
        source: 'node1',
        target: 'node2',
        markerStart: 'start-many',
        markerEnd: 'end-one',
      };

      const expected: EdgeProps = {
        id: 'e1',
        source: 'node1',
        target: 'node2',
        markerStart: 'many',
        markerEnd: 'one',
      };

      const result = convertToExternalEdge(internalEdge);
      expect(result).toEqual(expected);
    });
  });

  describe('convertToExternalEdges', () => {
    it('should convert multiple internal edges', () => {
      const internalEdges: InternalEdge[] = [
        {
          id: 'e1',
          source: 'n1',
          target: 'n2',
          markerStart: 'start-many',
          markerEnd: 'end-one',
        },
        {
          id: 'e2',
          source: 'n2',
          target: 'n3',
          markerStart: 'start-many',
          markerEnd: 'end-many',
        },
      ];

      const result = convertToExternalEdges(internalEdges);
      expect(result).toEqual([
        {
          id: 'e1',
          source: 'n1',
          target: 'n2',
          markerStart: 'many',
          markerEnd: 'one',
        },
        {
          id: 'e2',
          source: 'n2',
          target: 'n3',
          markerStart: 'many',
          markerEnd: 'many',
        },
      ]);
    });
  });
});
