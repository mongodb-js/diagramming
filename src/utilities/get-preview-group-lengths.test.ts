import { getPreviewGroupLengths } from '@/utilities/get-preview-group-lengths';

describe('get-preview-group-lengths', () => {
  it('With empty list', () => {
    const result = getPreviewGroupLengths([]);
    expect(result).toEqual({});
  });
  it('With single field with preview variant', () => {
    const result = getPreviewGroupLengths([{ variant: 'preview', name: 'orderId' }]);
    expect(result).toEqual({ orderId: 1 });
  });
  it('With all fields with preview variant', () => {
    const result = getPreviewGroupLengths([
      { variant: 'preview', name: 'orderId' },
      { variant: 'preview', name: 'shippingAddress' },
      { variant: 'preview', name: 'transactionId' },
    ]);
    expect(result).toEqual({ orderId: 3 });
  });
  it('With some fields with preview variant', () => {
    const result = getPreviewGroupLengths([
      { variant: 'preview', name: 'orderId' },
      { name: 'shippingAddress' },
      { variant: 'preview', name: 'transactionId' },
    ]);
    expect(result).toEqual({ orderId: 1, transactionId: 1 });
  });
});
