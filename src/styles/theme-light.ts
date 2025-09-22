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
    buttonColor: palette.gray.dark2,
  },
  node: {
    background: palette.white,
    backgroundHeader: palette.gray.light2,
    backgroundHover: palette.gray.light3,
    color: palette.black,
    border: palette.gray.base,
    icon: palette.gray.dark1,
    relationalAccent: palette.purple.base,
    mongoDBAccent: palette.green.dark1,
    disabledAccent: palette.gray.light1,
    disabledHeader: palette.gray.light3,
    disabledColor: palette.gray.light1,
    headerIcon: palette.gray.dark1,
    fieldIconButton: palette.gray.dark1,
    fieldIconButtonHover: palette.black,
    fieldIconButtonHoverBackground: hexToRgb(palette.gray.dark2, 0.1),
  },
};
