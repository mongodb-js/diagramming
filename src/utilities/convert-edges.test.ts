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
    it('should convert a single internal edge to external by stripping prefixes, ignoring data and type', () => {
      const internalEdge: InternalEdge = {
        id: 'e1',
        source: 'node1',
        target: 'node2',
        markerStart: 'start-many',
        markerEnd: 'end-one',
        type: 'floatingEdge',
        data: {},
      };

      const { data: _data, type: _type, ...rest } = internalEdge;
      const expected: EdgeProps = {
        ...rest,
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
          data: {},
        },
        {
          id: 'e2',
          source: 'n2',
          target: 'n3',
          markerStart: 'start-many',
          markerEnd: 'end-many',
          type: 'floatingEdge',
          data: {},
        },
        {
          id: 'e3',
          source: 'n2',
          target: 'n3',
          markerStart: 'start-many',
          markerEnd: 'end-many',
          type: 'fieldEdge',
          data: {
            sourceFieldId: ['fieldA'],
            targetFieldId: ['fieldB', 'childB'],
          },
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
        {
          id: 'e3',
          source: 'n2',
          target: 'n3',
          markerStart: 'many',
          markerEnd: 'many',
          sourceFieldId: ['fieldA'],
          targetFieldId: ['fieldB', 'childB'],
        },
      ]);
    });
  });

  describe('convertToInternalEdge', () => {
    const externalEdge: EdgeProps = {
      id: 'e1',
      source: 'node1',
      target: 'node2',
      markerStart: 'many',
      markerEnd: 'one',
    };
    it('Should preserve edge properties, adding marker prefixes', () => {
      const result = convertToInternalEdge(externalEdge);
      const { markerStart, markerEnd, ...rest } = externalEdge;
      expect(result).toMatchObject({
        ...rest,
        markerStart: `start-${markerStart}`,
        markerEnd: `end-${markerEnd}`,
      });
    });
    it('Should apply floatingEdge if the source is different from the target', () => {
      const result = convertToInternalEdge({
        ...externalEdge,
        source: 'node1',
        target: 'node2',
      });
      expect(result.type).toEqual('floatingEdge');
    });
    it('Should apply selfReferencingEdge if source and target are the same', () => {
      const result = convertToInternalEdge({
        ...externalEdge,
        source: 'node1',
        target: 'node1',
      });
      expect(result.type).toEqual('selfReferencingEdge');
    });
    it('Should apply fieldEdge if the field indexes are provided', () => {
      const result = convertToInternalEdge({
        ...externalEdge,
        sourceFieldId: ['fieldA'],
        targetFieldId: ['fieldB', 'childB'],
      });
      expect(result.type).toEqual('fieldEdge');
      expect(result).not.toHaveProperty('sourceFieldId');
      expect(result).not.toHaveProperty('targetFieldId');
      expect(result.data).toEqual({
        sourceFieldId: ['fieldA'],
        targetFieldId: ['fieldB', 'childB'],
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
          data: {},
        },
        {
          id: 'e2',
          source: 'node2',
          target: 'node2',
          markerStart: 'start-many',
          markerEnd: 'end-many',
          type: 'selfReferencingEdge',
          data: {},
        },
      ]);
    });
  });
});
