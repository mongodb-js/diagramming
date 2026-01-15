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
    it('Should convert node', () => {
      const internalNode: InternalNode = {
        id: 'node-1',
        type: 'collection',
        position: { x: 100, y: 200 },
        data: {
          title: 'some-title',
          fields: [{ name: 'field1', type: 'string', hasChildren: false, id: ['field1'], isVisible: true }],
        },
      };

      const result = convertToExternalNode(internalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'collection' as NodeType,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [{ name: 'field1', type: 'string', id: ['field1'] }],
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
      const externalNode = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
      };

      const result = convertToInternalNode(externalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'table',
        position: { x: 100, y: 200 },
        connectable: false,
        data: {
          title: 'some-title',
          fields: [],
          borderVariant: undefined,
          disabled: undefined,
        },
      });
    });
    it('Should be connectable', () => {
      const externalNode = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        connectable: true,
      };
      const result = convertToInternalNode(externalNode);
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
      const externalNode = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
        selectable: true,
      };
      const result = convertToInternalNode(externalNode);
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
    it('Should be handle node variant=default', () => {
      const externalNode = {
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
      const result = convertToInternalNode(externalNode);
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
          variant: {
            type: 'default',
          },
        },
      });
    });
    it('Should be handle node variant=warn', () => {
      const externalNode = {
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
      const result = convertToInternalNode(externalNode);
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
      const externalNode = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields,
      };

      const result = convertToInternalNode(externalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'table',
        position: { x: 100, y: 200 },
        connectable: false,
        data: {
          title: 'some-title',
          fields: [
            { id: ['expandedParent'], name: 'expandedParent', expanded: true, hasChildren: true, isVisible: true },
            { id: ['expandedParent', 'child1'], name: 'visibleChild1', depth: 1, hasChildren: false, isVisible: true },
            { id: ['expandedParent', 'child2'], name: 'visibleChild2', depth: 1, hasChildren: false, isVisible: true },
            { id: ['collapsedParent'], name: 'collapsedParent', expanded: false, hasChildren: true, isVisible: true },
            {
              id: ['collapsedParent', 'child1'],
              name: 'invisibleChild1',
              depth: 1,
              hasChildren: false,
              isVisible: false,
            },
            {
              id: ['collapsedParent', 'child2'],
              name: 'invisibleChild2',
              depth: 1,
              hasChildren: false,
              isVisible: false,
            },
            { id: ['other'], name: 'other', hasChildren: false, isVisible: true },
          ],
          borderVariant: undefined,
          disabled: undefined,
        },
      });
    });
    it('Should resolve expansion and assign expandability - multiple level', () => {
      const fields = [
        { id: ['level0Expanded'], name: 'level0Expanded', expanded: true },
        { id: ['level0Expanded', 'level1Expanded'], name: 'level1Expanded', expanded: true, depth: 1 },
        { id: ['level0Expanded', 'level1Expanded', 'child1'], name: 'visibleChild', depth: 2 },
        { id: ['level0Expanded', 'level1Collapsed'], name: 'level1Collapsed', expanded: false, depth: 1 },
        { id: ['level0Expanded', 'level1Collapsed', 'child1'], name: 'invisibleChild', depth: 2 },
        { id: ['level0Collapsed'], name: 'level0Collapsed', expanded: false },
        { id: ['level0Collapsed', 'level1Expanded'], name: 'level1Expanded', expanded: true, depth: 1 },
        { id: ['level0Collapsed', 'level1Expanded', 'child1'], name: 'anotherInvisibleChild', depth: 2 },
      ];
      const externalNode = {
        id: 'node-1',
        type: 'table' as const,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields,
      };

      const result = convertToInternalNode(externalNode);
      expect(result).toEqual({
        id: 'node-1',
        type: 'table',
        position: { x: 100, y: 200 },
        connectable: false,
        data: {
          title: 'some-title',
          fields: [
            { id: ['level0Expanded'], name: 'level0Expanded', expanded: true, hasChildren: true, isVisible: true },
            {
              id: ['level0Expanded', 'level1Expanded'],
              name: 'level1Expanded',
              expanded: true,
              depth: 1,
              hasChildren: true,
              isVisible: true,
            },
            {
              id: ['level0Expanded', 'level1Expanded', 'child1'],
              name: 'visibleChild',
              depth: 2,
              hasChildren: false,
              isVisible: true,
            },
            {
              id: ['level0Expanded', 'level1Collapsed'],
              name: 'level1Collapsed',
              expanded: false,
              depth: 1,
              hasChildren: true,
              isVisible: true,
            },
            {
              id: ['level0Expanded', 'level1Collapsed', 'child1'],
              name: 'invisibleChild',
              depth: 2,
              hasChildren: false,
              isVisible: false,
            },
            {
              id: ['level0Collapsed'],
              name: 'level0Collapsed',
              expanded: false,
              hasChildren: true,
              isVisible: true,
            },
            {
              id: ['level0Collapsed', 'level1Expanded'],
              name: 'level1Expanded',
              expanded: true,
              depth: 1,
              hasChildren: true,
              isVisible: false,
            },
            {
              id: ['level0Collapsed', 'level1Expanded', 'child1'],
              name: 'anotherInvisibleChild',
              depth: 2,
              hasChildren: false,
              isVisible: false,
            },
          ],
          borderVariant: undefined,
          disabled: undefined,
        },
      });
    });
  });

  describe('convertToInternalNodes', () => {
    it('Should convert node props to internal nodes', () => {
      const externalNodes = [
        {
          ...ORDERS_NODE,
          measured: {
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_FIELD_HEIGHT * 2,
          },
          disabled: true,
        },
        EMPLOYEES_NODE,
      ];
      const internalNodes = convertToInternalNodes(externalNodes);
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
              {
                name: 'ORDER_ID',
                type: 'varchar',
                glyphs: ['key'],
                hasChildren: false,
                id: ['ORDER_ID'],
                isVisible: true,
              },
              {
                name: 'SUPPLIER_ID',
                type: 'varchar',
                glyphs: ['link'],
                hasChildren: false,
                id: ['SUPPLIER_ID'],
                isVisible: true,
              },
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
              {
                name: 'employeeId',
                type: 'objectIdButMuchLonger',
                glyphs: ['key'],
                hasChildren: false,
                id: ['employeeId'],
                isVisible: true,
              },
              { name: 'employeeDetail', type: 'object', hasChildren: true, id: ['employeeDetail'], isVisible: true },
              {
                name: 'firstName',
                type: 'string',
                depth: 1,
                hasChildren: false,
                id: ['employeeDetail', 'firstName'],
                isVisible: true,
              },
              {
                name: 'lastName',
                type: 'string',
                depth: 1,
                hasChildren: false,
                id: ['employeeDetail', 'lastName'],
                isVisible: true,
              },
              { name: 'address', type: 'object', hasChildren: true, id: ['address'], isVisible: true },
              {
                name: 'street',
                type: 'string',
                depth: 1,
                hasChildren: false,
                id: ['address', 'street'],
                isVisible: true,
              },
              { name: 'city', type: 'string', depth: 1, hasChildren: false, id: ['address', 'city'], isVisible: true },
            ],
            title: 'employees',
          },
        },
      ]);
    });
  });
});
