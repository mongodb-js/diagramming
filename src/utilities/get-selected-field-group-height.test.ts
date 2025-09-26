import { getSelectedFieldGroupHeight, getSelectedId } from '@/utilities/get-selected-field-group-height';

describe('get-selected-field-group-height', () => {
  it('Should get selected id', () => {
    const selectedId = getSelectedId(40, 'orders');
    expect(selectedId).toEqual('40.orders');
  });

  it('With empty list', () => {
    const result = getSelectedFieldGroupHeight([], []);
    expect(result).toEqual({});
  });

  it('With single field with selected', () => {
    const result = getSelectedFieldGroupHeight([{ name: 'orderId' }], [['orderId']]);
    expect(result).toEqual({ ['0.orderId']: 1 });
  });

  it('With all fields selected', () => {
    const result = getSelectedFieldGroupHeight(
      [{ name: 'orderId' }, { name: 'shippingAddress' }, { name: 'transactionId' }],
      [['orderId'], ['shippingAddress'], ['transactionId']],
    );
    expect(result).toEqual({ ['0.orderId']: 3 });
  });

  it('With all fields selected, with duplicate names', () => {
    const result = getSelectedFieldGroupHeight(
      [{ name: 'orderId' }, { name: 'orderId' }, { name: 'orderId' }],
      [['orderId'], ['orderId'], ['orderId']],
    );
    expect(result).toEqual({ ['0.orderId']: 3 });
  });

  it('With no fields selected', () => {
    const result = getSelectedFieldGroupHeight(
      [{ name: 'orderId' }, { name: 'shippingAddress' }, { name: 'transactionId' }],
      [],
    );
    expect(result).toEqual({});
  });

  it('With some fields selected', () => {
    const result = getSelectedFieldGroupHeight(
      [{ name: 'orderId' }, { name: 'shippingAddress' }, { name: 'transactionId' }],
      [['orderId'], ['transactionId']],
    );
    expect(result).toEqual({ ['0.orderId']: 1, ['2.transactionId']: 1 });
  });

  it('With consecutive selected fields', () => {
    const result = getSelectedFieldGroupHeight(
      [
        { name: 'orderId' },
        { name: 'customerId' },
        { name: 'shippingAddress' },
        { name: 'transactionId' },
        { name: 'amount' },
      ],
      [['orderId'], ['customerId'], ['transactionId'], ['amount']],
    );
    expect(result).toEqual({ ['0.orderId']: 2, ['3.transactionId']: 2 });
  });

  it('With selected objects fields', () => {
    const result = getSelectedFieldGroupHeight(
      [
        { name: 'orderId' },
        { name: 'customer' },
        { name: 'customerId', depth: 1 },
        { name: 'shippingAddress', depth: 1 },
        { name: 'transactionId' },
        { name: 'amount' },
      ],
      [['orderId'], ['customer'], ['amount']],
    );
    expect(result).toEqual({ ['0.orderId']: 4, ['5.amount']: 1 });
  });
});
