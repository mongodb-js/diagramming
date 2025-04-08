import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { css, keyframes } from '@emotion/react';
import { spacing } from '@leafygreen-ui/tokens';

import { NodeBorderVariant } from '@/types';
import { DEFAULT_NODE_WIDTH } from '@/utilities/constants';

export const rotateAnimation = keyframes({
  '0%': {
    backgroundPosition: 'left top, right bottom, left bottom, right top',
  },
  '100%': {
    backgroundPosition: 'left 15px top, right 15px bottom, left bottom 15px, right top 15px',
  },
});

const borderProperties = css`
  border-radius: ${spacing[200]}px;
  width: ${DEFAULT_NODE_WIDTH + spacing[50]}px;
`;

export const AnimatedBorder = styled.div`
  background: linear-gradient(90deg, ${palette.blue.base} 50%, transparent 50%),
    linear-gradient(90deg, ${palette.blue.base} 50%, transparent 50%),
    linear-gradient(0deg, ${palette.blue.base} 50%, transparent 50%),
    linear-gradient(0deg, ${palette.blue.base} 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-position: left top, right bottom, left bottom, right top;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  padding: ${spacing[100]}px;
  margin: -${spacing[100]}px;
  animation: ${rotateAnimation} 1s linear infinite;
  ${borderProperties}
`;

const BasicBorder = styled.div<{ outlineBorderColor?: string }>`
  outline: ${props => (props.outlineBorderColor ? `2px solid ${props.outlineBorderColor}` : 'none')};
  outline-offset: 3px;
  ${borderProperties}
`;

interface Props {
  variant?: NodeBorderVariant;
}

export const NodeBorder = ({ children, variant }: PropsWithChildren<Props>) => {
  const getBasicBorderColor = () => {
    if (variant === 'subtle') {
      return palette.gray.base;
    } else if (variant === 'selected') {
      return palette.blue.base;
    }
  };

  if (variant === 'preview') {
    return <AnimatedBorder>{children}</AnimatedBorder>;
  }

  return <BasicBorder outlineBorderColor={getBasicBorderColor()}>{children}</BasicBorder>;
};
