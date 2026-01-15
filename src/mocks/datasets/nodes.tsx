import { NodeProps } from '@/types';

export const ORDERS_NODE: NodeProps = {
  id: 'orders',
  type: 'table',
  position: {
    x: 100,
    y: 100,
  },
  title: 'orders',
  fields: [
    { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'], id: ['ORDER_ID'] },
    { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'], id: ['SUPPLIER_ID'] },
  ],
};

export const EMPLOYEES_NODE: NodeProps = {
  id: 'employees',
  type: 'collection',
  position: {
    x: 300,
    y: 300,
  },
  title: 'employees',
  fields: [
    { name: 'employeeId', type: 'objectIdButMuchLonger', glyphs: ['key'], id: ['employeeId'] },
    { name: 'employeeDetail', type: 'object', id: ['employeeDetail'] },
    { name: 'firstName', type: 'string', depth: 1, id: ['employeeDetail', 'firstName'] },
    { name: 'lastName', type: 'string', depth: 1, id: ['employeeDetail', 'lastName'] },
    { name: 'address', type: 'object', id: ['address'] },
    { name: 'street', type: 'string', depth: 1, id: ['address', 'street'] },
    { name: 'city', type: 'string', depth: 1, id: ['address', 'city'] },
  ],
};

export const EMPLOYEE_TERRITORIES_NODE: NodeProps = {
  id: 'employee_territories',
  type: 'table',
  position: {
    x: 400,
    y: 100,
  },
  title: 'employee_territories',
  fields: [
    { name: 'employeeId', type: 'string', glyphs: ['key'], id: ['employeeId'] },
    { name: 'employeeTerritory', type: 'string', glyphs: ['key'], id: ['employeeTerritory'] },
  ],
};

export const CUSTOMERS_NODE: NodeProps = {
  id: 'customers',
  type: 'table',
  position: {
    x: 500,
    y: 100,
  },
  title: 'customers',
  fields: [
    {
      name: 'customerId',
      type: 'string',
      glyphs: ['key'],
      id: ['customerId'],
    },
    {
      name: 'contact',
      type: 'object',
      id: ['contact'],
    },
    {
      name: 'address',
      type: 'object',
      id: ['contact', 'address'],
      depth: 1,
    },
    {
      name: 'city',
      type: 'string',
      id: ['contact', 'address', 'city'],
      depth: 2,
    },
    {
      name: 'street',
      type: 'string',
      id: ['contact', 'address', 'street'],
      depth: 2,
    },
    {
      name: 'phone',
      type: 'string',
      id: ['contact', 'phone'],
      depth: 1,
    },
    {
      name: 'email',
      type: 'string',
      id: ['contact', 'email'],
      depth: 1,
    },
  ],
};
