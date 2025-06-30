import { InternalEdge } from '@/types/internal';
import { EdgeProps } from '@/types';
import {
  convertToExternalEdge,
  convertToExternalEdges,
  convertToInternalEdge,
  convertToInternalEdges,
} from '@/utilities/convert-edges';

describe('convert-edges', () => {
  describe('convertToExternalEdge', () => {
    it('should convert a single internal edge to external by stripping prefixes', () => {
      const internalEdge: InternalEdge = {
        id: 'e1',
        source: 'node1',
        target: 'node2',
        markerStart: 'start-many',
        markerEnd: 'end-one',
        type: 'floatingEdge',
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
          type: 'floatingEdge',
        },
        {
          id: 'e2',
          source: 'n2',
          target: 'n3',
          markerStart: 'start-many',
          markerEnd: 'end-many',
          type: 'floatingEdge',
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

  describe('convertToInternalEdge', () => {
    it('Should convert edge props to internal edge', () => {
      const result = convertToInternalEdge({
        id: 'e1',
        source: 'node1',
        target: 'node2',
        markerStart: 'many',
        markerEnd: 'one',
      });
      expect(result).toEqual({
        id: 'e1',
        source: 'node1',
        target: 'node2',
        markerStart: 'start-many',
        markerEnd: 'end-one',
        type: 'floatingEdge',
      });
    });
    it('Should mark type as selfReferencingEdge if source and target are the same', () => {
      const result = convertToInternalEdge({
        id: 'e1',
        source: 'node1',
        target: 'node1',
        markerStart: 'many',
        markerEnd: 'one',
      });
      expect(result).toEqual({
        id: 'e1',
        source: 'node1',
        target: 'node1',
        markerStart: 'start-many',
        markerEnd: 'end-one',
        type: 'selfReferencingEdge',
      });
    });
  });
  describe('convertToInternalEdges', () => {
    it('Should convert edge props to internal edges', () => {
      const edges: EdgeProps[] = [
        {
          id: 'e1',
          source: 'node1',
          target: 'node2',
          markerStart: 'many',
          markerEnd: 'one',
        },
        {
          id: 'e2',
          source: 'node2',
          target: 'node2',
          markerStart: 'many',
          markerEnd: 'many',
        },
      ];

      const result = convertToInternalEdges(edges);
      expect(result).toEqual([
        {
          id: 'e1',
          source: 'node1',
          target: 'node2',
          markerStart: 'start-many',
          markerEnd: 'end-one',
          type: 'floatingEdge',
        },
        {
          id: 'e2',
          source: 'node2',
          target: 'node3',
          markerStart: 'start-many',
          markerEnd: 'end-many',
          type: 'selfReferencingEdge',
        },
      ]);
    });
  });
});
