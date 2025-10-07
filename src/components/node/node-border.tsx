import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { css } from '@emotion/react';
import { spacing } from '@leafygreen-ui/tokens';

import { NodeBorderVariant } from '@/types';
import { DEFAULT_NODE_WIDTH } from '@/utilities/constants';
import { animatedBlueBorder } from '@/styles/styles';

const borderProperties = css`
  border-radius: ${spacing[200]}px;
`;

export const Border = styled.div`
  width: ${DEFAULT_NODE_WIDTH}px;
`;

export const AnimatedBorder = styled.div<{ height?: string }>`
  height: ${props => (props.height ? props.height : '100%')};
  padding: ${spacing[100]}px;
  margin: -${spacing[100]}px;
  ${animatedBlueBorder};
  ${borderProperties};
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
    return (
      <Border>
        <AnimatedBorder data-testid="node-border">{children}</AnimatedBorder>
      </Border>
    );
  }

  return (
    <Border>
      <BasicBorder data-testid="node-border" outlineBorderColor={getBasicBorderColor()}>
        {children}
      </BasicBorder>
    </Border>
  );
};
