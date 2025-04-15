import { Edge } from '@/types';

export const ORDERS_TO_EMPLOYEES_EDGE: Edge = {
  id: 'employees-to-orders',
  type: 'floatingEdge',
  source: 'employees',
  target: 'orders',
  markerEnd: 'one',
  markerStart: 'one',
};
