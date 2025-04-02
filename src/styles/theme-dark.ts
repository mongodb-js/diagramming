import { Theme } from '@emotion/react';
import { palette } from '@leafygreen-ui/palette';
import { hexToRgb } from '@/styles/utils';
import { purple30 } from './overrides';

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
    buttonColor: palette.gray.light2,
  },
  node: {
    background: palette.black,
    backgroundHeader: palette.gray.dark2,
    backgroundHover: palette.gray.dark3,
    color: palette.gray.light2,
    border: palette.gray.dark1,
    relationalAccent: purple30,
    mongoDBAccent: palette.green.base,
    headerIcon: palette.gray.light2,
  },
};
