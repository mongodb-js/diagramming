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
        data: {
          borderVariant: undefined,
          fields: [
            {
              name: 'one',
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
        data: {
          borderVariant: undefined,
          fields: [
            {
              name: 'one',
            },
          ],
          title: 'employees',
        },
      },
    ]);
  });
});
