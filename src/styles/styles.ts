import { css, keyframes } from '@emotion/react';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const ellipsisTruncation = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const rotateAnimation = keyframes({
  '0%': {
    backgroundPosition: 'left top, right bottom, left bottom, right top',
  },
  '100%': {
    backgroundPosition: 'left 15px top, right 15px bottom, left bottom 15px, right top 15px',
  },
});

export const animatedBlueBorder = css`
  background: linear-gradient(90deg, ${palette.blue.base} 50%, transparent 50%),
    linear-gradient(90deg, ${palette.blue.base} 50%, transparent 50%),
    linear-gradient(0deg, ${palette.blue.base} 50%, transparent 50%),
    linear-gradient(0deg, ${palette.blue.base} 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-position: left top, right bottom, left bottom, right top;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  animation: ${rotateAnimation} 1s linear infinite;
  border-radius: ${spacing[200]}px;
`;
