import { getSelectedFieldGroupHeight, getSelectedId } from '@/utilities/get-selected-field-group-height';

describe('get-selected-field-group-height', () => {
  it('Should get selected id', () => {
    const selectedId = getSelectedId(40, 'orders');
    expect(selectedId).toEqual('40.orders');
  });

  it('With empty list', () => {
    const result = getSelectedFieldGroupHeight([]);
    expect(result).toEqual({});
  });

  it('With single field with selected', () => {
    const result = getSelectedFieldGroupHeight([{ selected: true, name: 'orderId' }]);
    expect(result).toEqual({ ['0.orderId']: 1 });
  });

  it('With all fields selected', () => {
    const result = getSelectedFieldGroupHeight([
      { selected: true, name: 'orderId' },
      { selected: true, name: 'shippingAddress' },
      { selected: true, name: 'transactionId' },
    ]);
    expect(result).toEqual({ ['0.orderId']: 3 });
  });

  it('With all fields selected, with duplicate names', () => {
    const result = getSelectedFieldGroupHeight([
      { selected: true, name: 'orderId' },
      { selected: true, name: 'orderId' },
      { selected: true, name: 'orderId' },
    ]);
    expect(result).toEqual({ ['0.orderId']: 3 });
  });

  it('With no fields selected', () => {
    const result = getSelectedFieldGroupHeight([
      { name: 'orderId' },
      { name: 'shippingAddress' },
      { name: 'transactionId' },
    ]);
    expect(result).toEqual({});
  });

  it('With some fields selected', () => {
    const result = getSelectedFieldGroupHeight([
      { selected: true, name: 'orderId' },
      { name: 'shippingAddress' },
      { selected: true, name: 'transactionId' },
    ]);
    expect(result).toEqual({ ['0.orderId']: 1, ['2.transactionId']: 1 });
  });

  it('With consecutive selected fields', () => {
    const result = getSelectedFieldGroupHeight([
      { selected: true, name: 'orderId' },
      { selected: true, name: 'customerId' },
      { name: 'shippingAddress' },
      { selected: true, name: 'transactionId' },
      { selected: true, name: 'amount' },
    ]);
    expect(result).toEqual({ ['0.orderId']: 2, ['3.transactionId']: 2 });
  });

  it('With selected objects fields', () => {
    const result = getSelectedFieldGroupHeight([
      { selected: true, name: 'orderId' },
      { selected: true, name: 'customer' },
      { name: 'customerId', depth: 1 },
      { name: 'shippingAddress', depth: 1 },
      { name: 'transactionId' },
      { selected: true, name: 'amount' },
    ]);
    expect(result).toEqual({ ['0.orderId']: 4, ['5.amount']: 1 });
  });
});
