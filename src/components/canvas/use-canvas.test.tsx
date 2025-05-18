import { renderHook } from '@/mocks/testing-utils';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { EMPLOYEES_TO_EMPLOYEES_EDGE, ORDERS_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';

import { useCanvas } from './use-canvas';

describe('use-canvas', () => {
  it('Should get initial nodes', () => {
    const { result } = renderHook(() => useCanvas([{ ...ORDERS_NODE, disabled: true }, EMPLOYEES_NODE], []));
    expect(result.current.initialNodes).toEqual([
      {
        id: 'orders',
        type: 'table',
        position: {
          x: 100,
          y: 100,
        },
        draggable: false,
        connectable: false,
        measured: {
          height: 36,
          width: 244,
        },
        data: {
          disabled: true,
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
        draggable: true,
        connectable: false,
        data: {
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
  it('Should be connectable', () => {
    const { result } = renderHook(() => useCanvas([{ ...ORDERS_NODE, connectable: true }], []));
    expect(result.current.initialNodes).toEqual([
      {
        id: 'orders',
        type: 'table',
        position: {
          x: 100,
          y: 100,
        },
        draggable: false,
        connectable: true,
        selectable: false,
        measured: {
          height: 36,
          width: 244,
        },
        data: {
          fields: [
            { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'] },
            { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'] },
          ],
          title: 'orders',
        },
      },
    ]);
  });
  it('Should be selectable', () => {
    const { result } = renderHook(() => useCanvas([{ ...ORDERS_NODE, selectable: true }], []));
    expect(result.current.initialNodes).toEqual([
      {
        id: 'orders',
        type: 'table',
        position: {
          x: 100,
          y: 100,
        },
        draggable: true,
        selectable: true,
        connectable: false,
        measured: {
          height: 36,
          width: 244,
        },
        data: {
          fields: [
            { name: 'ORDER_ID', type: 'varchar', glyphs: ['key'] },
            { name: 'SUPPLIER_ID', type: 'varchar', glyphs: ['link'] },
          ],
          title: 'orders',
        },
      },
    ]);
  });
  it('Should get initial floating edges', () => {
    const { result } = renderHook(() => useCanvas([], [ORDERS_TO_EMPLOYEES_EDGE]));
    expect(result.current.initialEdges).toEqual([
      {
        id: 'employees-to-orders',
        markerEnd: 'end-one',
        markerStart: 'start-many',
        source: 'employees',
        target: 'orders',
        type: 'floatingEdge',
      },
    ]);
  });
  it('Should get self referencing edges', () => {
    const { result } = renderHook(() => useCanvas([], [EMPLOYEES_TO_EMPLOYEES_EDGE]));
    expect(result.current.initialEdges).toEqual([
      {
        id: 'employees-to-employees',
        source: 'employees',
        target: 'employees',
        markerEnd: 'end-one',
        markerStart: 'start-many',
        type: 'selfReferencingEdge',
      },
    ]);
  });
});
