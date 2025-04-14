import { renderHook } from '@/mocks/testing-utils';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';

import { useCanvas } from './use-canvas';

describe('use-canvas', () => {
  it('should get initial nodes', () => {
    const { result } = renderHook(() => useCanvas([ORDERS_NODE, EMPLOYEES_NODE]));
    expect(result.current.initialNodes).toEqual([
      {
        id: 'orders',
        type: 'table',
        position: {
          x: 100,
          y: 100,
        },
        measured: {
          height: 36,
          width: 244,
        },
        data: {
          borderVariant: undefined,
          fields: [
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
        measured: {
          height: 72,
          width: 244,
        },
        data: {
          borderVariant: undefined,
          fields: [
            { name: 'employeeId', type: 'objectId', glyphs: ['key'] },
            { name: 'employeeDetail', type: '{}' },
            { name: 'firstName', type: 'string', depth: 1 },
            { name: 'lastName', type: 'string', depth: 1 },
          ],
          title: 'employees',
        },
      },
    ]);
  });
});
