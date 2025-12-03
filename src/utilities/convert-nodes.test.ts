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
          allFields: [],
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
    it('Should convert to external node when variant=default', () => {
      const internalNode: InternalNode = {
        id: 'node-1',
        type: 'collection',
        position: { x: 100, y: 200 },
        data: {
          title: 'some-title',
          fields: [],
          allFields: [],
          variant: {
            type: 'default',
          },
        },
      };

      const result = convertToExternalNode(internalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'collection' as NodeType,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        variant: {
          type: 'default',
        },
      });
    });
    it('Should convert to external node when variant=warn', () => {
      const internalNode: InternalNode = {
        id: 'node-1',
        type: 'collection',
        position: { x: 100, y: 200 },
        data: {
          title: 'some-title',
          fields: [],
          allFields: [],
          variant: {
            type: 'warn',
            warnMessage: 'This is a warning',
          },
        },
      };

      const result = convertToExternalNode(internalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'collection' as NodeType,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        variant: {
          type: 'warn',
          warnMessage: 'This is a warning',
        },
      });
    });
    it('Should use allFields and ignore fields', () => {
      const internalNode: InternalNode = {
        id: 'node-1',
        type: 'collection',
        position: { x: 100, y: 200 },
        data: {
          title: 'some-title',
          fields: [{ name: 'field1', type: 'string', expandable: true, expanded: false }],
          allFields: [
            { name: 'field1', type: 'string', expanded: false },
            { name: 'field2', type: 'number' },
          ],
        },
      };

      const result = convertToExternalNode(internalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'collection' as NodeType,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [
          { name: 'field1', type: 'string', expanded: false },
          { name: 'field2', type: 'number' },
        ],
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
          data: { title: 'Node 1', fields: [], allFields: [] },
        },
        {
          id: 'n2',
          type: 'table',
          position: { x: 10, y: 10 },
          data: { title: 'Node 2', fields: [], allFields: [] },
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
          title: 'some-title',
          fields: [],
          allFields: [],
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
          allFields: [],
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
          allFields: [],
          borderVariant: undefined,
          disabled: undefined,
        },
      });
    });
    it('Should be handle node variant=default', () => {
      const node = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        selectable: true,
        variant: {
          type: 'default' as const,
        },
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
          allFields: [],
          borderVariant: undefined,
          disabled: undefined,
          variant: {
            type: 'default',
          },
        },
      });
    });
    it('Should be handle node variant=warn', () => {
      const node = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        selectable: true,
        variant: {
          type: 'warn' as const,
          warnMessage: 'This is a warning',
        },
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
          allFields: [],
          borderVariant: undefined,
          disabled: undefined,
          variant: {
            type: 'warn',
            warnMessage: 'This is a warning',
          },
        },
      });
    });
    it('Should resolve expansion and assign expandability', () => {
      const fields = [
        { id: ['expandedParent'], name: 'expandedParent', expanded: true },
        { id: ['expandedParent', 'child1'], name: 'visibleChild1', depth: 1 },
        { id: ['expandedParent', 'child2'], name: 'visibleChild2', depth: 1 },
        { id: ['collapsedParent'], name: 'collapsedParent', expanded: false },
        { id: ['collapsedParent', 'child1'], name: 'invisibleChild1', depth: 1 },
        { id: ['collapsedParent', 'child2'], name: 'invisibleChild2', depth: 1 },
        { id: ['other'], name: 'other' },
      ];
      const node = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields,
      };

      const result = convertToInternalNode(node);
      expect(result).toEqual({
        id: 'node-1',
        type: 'table',
        position: { x: 100, y: 200 },
        connectable: false,
        data: {
          title: 'some-title',
          fields: [
            { id: ['expandedParent'], name: 'expandedParent', expanded: true, expandable: true },
            { id: ['expandedParent', 'child1'], name: 'visibleChild1', depth: 1, expandable: false },
            { id: ['expandedParent', 'child2'], name: 'visibleChild2', depth: 1, expandable: false },
            { id: ['collapsedParent'], name: 'collapsedParent', expanded: false, expandable: true },
            { id: ['other'], name: 'other', expandable: false },
          ],
          allFields: fields,
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
              { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'], expandable: false },
              { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'], expandable: false },
            ],
            allFields: [
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
              { name: 'employeeId', type: 'objectIdButMuchLonger', glyphs: ['key'], expandable: false },
              { name: 'employeeDetail', type: 'object', expandable: true },
              { name: 'firstName', type: 'string', depth: 1, expandable: false },
              { name: 'lastName', type: 'string', depth: 1, expandable: false },
              { name: 'address', type: 'object', expandable: true },
              { name: 'street', type: 'string', depth: 1, expandable: false },
              { name: 'city', type: 'string', depth: 1, expandable: false },
            ],
            allFields: [
              { name: 'employeeId', type: 'objectIdButMuchLonger', glyphs: ['key'] },
              { name: 'employeeDetail', type: 'object' },
              { name: 'firstName', type: 'string', depth: 1 },
              { name: 'lastName', type: 'string', depth: 1 },
              { name: 'address', type: 'object' },
              { name: 'street', type: 'string', depth: 1 },
              { name: 'city', type: 'string', depth: 1 },
            ],
            title: 'employees',
          },
        },
      ]);
    });
  });
});
