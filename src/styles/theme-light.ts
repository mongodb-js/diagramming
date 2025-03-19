import { Theme } from '@emotion/react';
import { palette } from '@leafygreen-ui/palette';
import { hexToRgb } from '@/styles/utils';

export const LIGHT_THEME: Theme = {
  background: palette.gray.light3,
  minimap: {
    node: palette.gray.light1,
    mask: hexToRgb(palette.gray.light2, 0.6),
    selectionArea: palette.gray.light3,
  },
  controls: {
    background: palette.gray.light3,
    backgroundHover: palette.gray.light2,
    zoomText: palette.gray.dark1,
  },
};
