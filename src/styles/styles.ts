import { palette } from '@leafygreen-ui/palette';
import { hexToRgb } from '@/styles/utils';
import { Theme } from '@emotion/react';

export interface DiagramTheme {
  background: string;
  minimap: {
    node: string;
    mask: string;
    selectionArea: string;
  };
}

declare module '@emotion/react' {
  export interface Theme extends DiagramTheme {}
}

export const DARK_THEME: Theme = {
  background: palette.black,
  minimap: {
    node: palette.gray.dark1,
    mask: hexToRgb(palette.gray.dark4, 0.5),
    selectionArea: palette.black,
  },
};
export const LIGHT_THEME: Theme = {
  background: palette.gray.light3,
  minimap: {
    node: palette.gray.light1,
    mask: hexToRgb(palette.gray.light2, 0.6),
    selectionArea: palette.gray.light3,
  },
};
