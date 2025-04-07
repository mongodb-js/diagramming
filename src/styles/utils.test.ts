import { palette } from '@leafygreen-ui/palette';

import { hexToRgb } from '@/styles/utils';

describe('styles/utils', () => {
  describe('hexToRgb', () => {
    it('Can convert hex value', () => {
      expect(hexToRgb(palette.white, 1)).toBe('rgb(255,255,255, 1)');
    });
  });
});
