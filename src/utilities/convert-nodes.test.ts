import { InternalNode } from '@/types/internal';
import { NodeType } from '@/types';
import {
  convertToExternalNode,
  convertToExternalNodes,
  convertToInternalNode,
  convertToInternalNodes,
} from '@/utilities/convert-nodes';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { DEFAULT_FIELD_HEIGHT, DEFAULT_NODE_WIDTH } from '@/utilities/constants';

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

  describe('convertToInternalNode', () => {
    it('Should convert node props to internal node', () => {
      const node = {
        id: 'node-1',
        actions: 'pineapple',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
      };

      const result = convertToInternalNode(node);
      expect(result).toEqual({
        id: 'node-1',
        type: 'table',
        position: { x: 100, y: 200 },
        connectable: false,
        data: {
          actions: 'pineapple',
          title: 'some-title',
          fields: [],
          borderVariant: undefined,
          disabled: undefined,
        },
      });
    });
    it('Should be connectable', () => {
      const node = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        connectable: true,
      };
      const result = convertToInternalNode(node);
      expect(result).toEqual({
        id: 'node-1',
        type: 'table',
        position: { x: 100, y: 200 },
        connectable: true,
        data: {
          title: 'some-title',
          fields: [],
          borderVariant: undefined,
          disabled: undefined,
        },
      });
    });
    it('Should be selectable', () => {
      const node = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        selectable: true,
      };
      const result = convertToInternalNode(node);
      expect(result).toEqual({
        id: 'node-1',
        type: 'table',
        position: { x: 100, y: 200 },
        connectable: false,
        selectable: true,
        data: {
          title: 'some-title',
          fields: [],
          borderVariant: undefined,
          disabled: undefined,
        },
      });
    });
  });

  describe('convertToInternalNodes', () => {
    it('Should convert node props to internal node', () => {
      const internalNodes = convertToInternalNodes([
        {
          ...ORDERS_NODE,
          measured: {
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_FIELD_HEIGHT * 2,
          },
          disabled: true,
        },
        EMPLOYEES_NODE,
      ]);
      expect(internalNodes).toEqual([
        {
          id: 'orders',
          type: 'table',
          position: {
            x: 100,
            y: 100,
          },
          connectable: false,
          measured: {
            height: 36,
            width: 244,
          },
          data: {
            disabled: true,
            fields: [
              { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'] },
              { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'] },
            ],
            title: 'orders',
          },
        },
        {
          id: 'employees',
          type: 'collection',
          position: {
            x: 300,
            y: 300,
          },
          connectable: false,
          data: {
            fields: [
              { name: 'employeeId', type: 'objectId', glyphs: ['key'] },
              { name: 'employeeDetail', type: '{}' },
              { name: 'firstName', type: 'string', depth: 1 },
              { name: 'lastName', type: 'string', depth: 1 },
            ],
            title: 'employees',
          },
        },
      ]);
    });
  });
});
