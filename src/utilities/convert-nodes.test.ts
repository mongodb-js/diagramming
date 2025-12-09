import { InternalNode } from '@/types/internal';
import { NodeType } from '@/types';
import { convertToInternalNode, convertToInternalNodes, getExternalNode } from '@/utilities/convert-nodes';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { DEFAULT_FIELD_HEIGHT, DEFAULT_NODE_WIDTH } from '@/utilities/constants';

describe('convert-nodes', () => {
  describe('getExternalNode', () => {
    it('Should retrieve the original node', () => {
      const externalNode = {
        id: 'node-1',
        type: 'collection' as NodeType,
        position: { x: 100, y: 200 },
        title: 'some-title',
        fields: [],
      };
      const internalNode: InternalNode = {
        id: 'node-1',
        type: 'collection',
        position: { x: 100, y: 200 },
        data: {
          title: 'some-title',
          fields: [],
          externalNode,
        },
      };

      const result = getExternalNode(internalNode);
      expect(result).toEqual(externalNode);
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
          externalNode,
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
          externalNode,
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
          externalNode,
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
          externalNode,
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
          externalNode,
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
            { id: ['expandedParent'], name: 'expandedParent', expanded: true, hasChildren: true },
            { id: ['expandedParent', 'child1'], name: 'visibleChild1', depth: 1, hasChildren: false },
            { id: ['expandedParent', 'child2'], name: 'visibleChild2', depth: 1, hasChildren: false },
            { id: ['collapsedParent'], name: 'collapsedParent', expanded: false, hasChildren: true },
            { id: ['other'], name: 'other', hasChildren: false },
          ],
          borderVariant: undefined,
          disabled: undefined,
          externalNode,
        },
      });
    });
  });

  describe('convertToInternalNodes', () => {
    it('Should convert node props to internal node', () => {
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
              { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'], hasChildren: false, id: ['ORDER_ID'] },
              { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'], hasChildren: false, id: ['SUPPLIER_ID'] },
            ],
            externalNode: externalNodes[0],
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
              },
              { name: 'employeeDetail', type: 'object', hasChildren: true, id: ['employeeDetail'] },
              { name: 'firstName', type: 'string', depth: 1, hasChildren: false, id: ['employeeDetail', 'firstName'] },
              { name: 'lastName', type: 'string', depth: 1, hasChildren: false, id: ['employeeDetail', 'lastName'] },
              { name: 'address', type: 'object', hasChildren: true, id: ['address'] },
              {
                name: 'street',
                type: 'string',
                depth: 1,
                hasChildren: false,
                id: ['address', 'street'],
              },
              { name: 'city', type: 'string', depth: 1, hasChildren: false, id: ['address', 'city'] },
            ],
            title: 'employees',
            externalNode: externalNodes[1],
          },
        },
      ]);
    });
  });
});
