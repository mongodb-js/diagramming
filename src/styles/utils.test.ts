import { hexToRgb } from '@/styles/utils';
import { palette } from '@leafygreen-ui/palette';

describe('styles/utils', () => {
  describe('hexToRgb', () => {
    it('Can convert hex value', () => {
      expect(hexToRgb(palette.white, 1)).toBe('rgb(255,255,255, 1)');
    });
  });
});
