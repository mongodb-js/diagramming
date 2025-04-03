import { Node } from '@/types/node';

export const ORDERS_NODE: Node = {
  id: 'orders',
  type: 'table',
  position: {
    x: 100,
    y: 100,
  },
  title: 'orders',
  fields: [{ name: 'one' }],
};

export const EMPLOYEES_NODE: Node = {
  id: 'employees',
  type: 'collection',
  position: {
    x: 300,
    y: 300,
  },
  title: 'employees',
  fields: [{ name: 'one' }],
};
