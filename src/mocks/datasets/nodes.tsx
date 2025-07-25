import { NodeProps } from '@/types';
import { DEFAULT_FIELD_HEIGHT, DEFAULT_NODE_WIDTH } from '@/utilities/constants';

export const ORDERS_NODE: NodeProps = {
  id: 'orders',
  type: 'table',
  position: {
    x: 100,
    y: 100,
  },
  measured: {
    width: DEFAULT_NODE_WIDTH,
    height: DEFAULT_FIELD_HEIGHT * 2,
  },
  title: 'orders',
  fields: [
    { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'] },
    { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'] },
  ],
};

export const EMPLOYEES_NODE: NodeProps = {
  id: 'employees',
  type: 'collection',
  position: {
    x: 300,
    y: 300,
  },
  measured: {
    width: DEFAULT_NODE_WIDTH,
    height: DEFAULT_FIELD_HEIGHT * 4,
  },
  title: 'employees',
  fields: [
    { name: 'employeeId', type: 'objectId', glyphs: ['key'] },
    { name: 'employeeDetail', type: '{}' },
    { name: 'firstName', type: 'string', depth: 1 },
    { name: 'lastName', type: 'string', depth: 1 },
  ],
};

export const EMPLOYEE_TERRITORIES_NODE: NodeProps = {
  id: 'employee_territories',
  type: 'table',
  position: {
    x: 400,
    y: 100,
  },
  measured: {
    width: DEFAULT_NODE_WIDTH,
    height: DEFAULT_FIELD_HEIGHT * 4,
  },
  title: 'employee_territories',
  fields: [
    { name: 'employeeId', type: 'string', glyphs: ['key'] },
    { name: 'employeeTerritory', type: 'string', glyphs: ['key'] },
  ],
};
