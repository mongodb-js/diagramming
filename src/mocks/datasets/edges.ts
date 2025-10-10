import { EdgeProps } from '@/types';

export const EMPLOYEES_TO_ORDERS_EDGE: EdgeProps = {
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

export const EMPLOYEES_TO_EMPLOYEE_TERRITORIES_EDGE: EdgeProps = {
  id: 'employees-to-employee-territories',
  source: 'employees',
  target: 'employee_territories',
  markerEnd: 'many',
  markerStart: 'one',
};
