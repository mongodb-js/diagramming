import { getEdgeParams } from '@/utilities/get-edge-params';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';

describe('get-edge-params', () => {
  it('Should get parameters', () => {
    const result = getEdgeParams(
      { ...ORDERS_NODE, data: { title: ORDERS_NODE.title, fields: ORDERS_NODE.fields } },
      { ...EMPLOYEES_NODE, data: { title: EMPLOYEES_NODE.title, fields: EMPLOYEES_NODE.fields } },
    );
    expect(result).toEqual({
      sourcePos: 'bottom',
      sx: 240,
      sy: 136,
      targetPos: 'top',
      tx: 386,
      ty: 300,
    });
  });
});
