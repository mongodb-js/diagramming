import { getPreviewGroupArea } from '@/utilities/get-preview-group-area';

describe('get-preview-group-lengths', () => {
  it('With empty list', () => {
    const result = getPreviewGroupArea([]);
    expect(result).toEqual({});
  });
  it('With single field with preview variant', () => {
    const result = getPreviewGroupArea([{ variant: 'preview', name: 'orderId' }]);
    expect(result).toEqual({ orderId: { height: 1, width: 0 } });
  });
  it('With all fields with preview variant', () => {
    const result = getPreviewGroupArea([
      { variant: 'preview', name: 'orderId' },
      { variant: 'preview', name: 'shippingAddress' },
      { variant: 'preview', name: 'transactionId' },
    ]);
    expect(result).toEqual({ orderId: { height: 3, width: 0 } });
  });
  it('With variable number of glyphs', () => {
    const result = getPreviewGroupArea([
      { variant: 'preview', name: 'orderId', glyphs: ['key', 'key'] },
      { variant: 'preview', name: 'shippingAddress', glyphs: ['key', 'key', 'key', 'key'] },
      { variant: 'preview', name: 'transactionId' },
    ]);
    expect(result).toEqual({ orderId: { height: 3, width: 4 } });
  });
  it('With some fields with preview variant', () => {
    const result = getPreviewGroupArea([
      { variant: 'preview', name: 'orderId', glyphs: ['key'] },
      { name: 'shippingAddress' },
      { variant: 'preview', name: 'transactionId' },
    ]);
    expect(result).toEqual({ orderId: { height: 1, width: 1 }, transactionId: { height: 1, width: 0 } });
  });
});
