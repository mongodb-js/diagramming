import { Theme } from '@emotion/react';
import { palette } from '@leafygreen-ui/palette';
import { hexToRgb } from '@/styles/utils';

export const DARK_THEME: Theme = {
  background: palette.black,
  minimap: {
    node: palette.gray.dark1,
    mask: hexToRgb(palette.gray.dark4, 0.5),
    selectionArea: palette.black,
  },
  controls: {
    background: palette.gray.dark2,
    backgroundHover: palette.gray.dark1,
    zoomText: palette.gray.base,
  },
};
