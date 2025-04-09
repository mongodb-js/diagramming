import { Node } from '@/types/node';

export const ORDERS_NODE: Node = {
  id: 'orders',
  type: 'table',
  position: {
    x: 100,
    y: 100,
  },
  title: 'orders',
  fields: [
    { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'] },
    { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'] },
  ],
};

export const EMPLOYEES_NODE: Node = {
  id: 'employees',
  type: 'collection',
  position: {
    x: 300,
    y: 300,
  },
  title: 'employees',
  fields: [
    { name: 'employeeId', type: 'objectId', glyphs: ['key'] },
    { name: 'employeeDetail', type: '{}' },
    { name: 'firstName', type: 'string', depth: 1 },
    { name: 'lastName', type: 'string', depth: 1 },
  ],
};
