import { EdgeProps } from '@/types';

export const ORDERS_TO_EMPLOYEES_EDGE: EdgeProps = {
  id: 'employees-to-orders',
  source: 'employees',
  target: 'orders',
  markerEnd: 'one',
  markerStart: 'many',
};

export const EMPLOYEES_TO_EMPLOYEES_EDGE: EdgeProps = {
  id: 'employees-to-employees',
  source: 'employees',
  target: 'employees',
  markerEnd: 'one',
  markerStart: 'many',
};
