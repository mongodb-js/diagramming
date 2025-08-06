import { getEdgeParams } from '@/utilities/get-edge-params';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { DEFAULT_FIELD_HEIGHT, DEFAULT_NODE_WIDTH } from '@/utilities/constants';

describe('get-edge-params', () => {
  describe('Without measured heights', () => {
    it('Should get parameters', () => {
      const result = getEdgeParams(
        { ...ORDERS_NODE, data: { title: ORDERS_NODE.title, fields: ORDERS_NODE.fields } },
        { ...EMPLOYEES_NODE, data: { title: EMPLOYEES_NODE.title, fields: EMPLOYEES_NODE.fields } },
      );
      expect(result).toEqual({
        sourcePos: 'right',
        sx: 269.5,
        sy: 180,
        targetPos: 'right',
        tx: 371.5,
        ty: 300,
      });
    });
  });

  describe('With measured heights', () => {
    it('Should get parameters', () => {
      const result = getEdgeParams(
        {
          ...ORDERS_NODE,
          data: { title: ORDERS_NODE.title, fields: ORDERS_NODE.fields },
          measured: {
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_FIELD_HEIGHT * 2,
          },
        },
        {
          ...EMPLOYEES_NODE,
          data: { title: EMPLOYEES_NODE.title, fields: EMPLOYEES_NODE.fields },
          measured: {
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_FIELD_HEIGHT * 4,
          },
        },
      );
      expect(result).toEqual({
        sourcePos: 'bottom',
        sx: 240,
        sy: 143.5,
        targetPos: 'top',
        tx: 386,
        ty: 292.5,
      });
    });
  });
});
