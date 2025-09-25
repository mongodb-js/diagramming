import { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';

const StyledDiagramIconButton = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: ${spacing[100]}px;
  margin: 0;
  margin-left: ${spacing[100]}px;
  cursor: pointer;
  color: inherit;
  display: flex;
  position: relative;
  color: ${props => props.theme.node.fieldIconButton};

  &::before {
    content: '';
    transition: ${transitionDuration.default}ms all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 100%;
    transform: scale(0.8);
  }

  &:active::before,
  &:hover::before,
  &:focus::before,
  &[data-hover='true']::before,
  &[data-focus='true']::before {
    transform: scale(1);
  }

  &:active,
  &:hover,
  &[data-hover='true'],
  &:focus-visible,
  &[data-focus='true'] {
    color: ${palette.black};

    &::before {
      background-color: ${props => props.theme.node.fieldIconButtonHoverBackground};
    }
  }

  // Focus ring styles.
  &::after {
    position: absolute;
    content: '';
    pointer-events: none;
    top: 3px;
    right: 3px;
    bottom: 3px;
    left: 3px;
    border-radius: ${spacing[100]}px;
    box-shadow: 0 0 0 0 transparent;
    transition: box-shadow 0.16s ease-in;
    z-index: 1;
  }
  &:focus-visible {
    &::after {
      box-shadow: 0 0 0 3px ${palette.blue.light1} !important;
      transition-timing-function: ease-out;
    }
  }
`;

// Use a custom button component instead of LeafyGreen's IconButton
// to allow us to have a smaller focus ring and icon size without overwriting internal styles.
export const DiagramIconButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
}) => {
  return <StyledDiagramIconButton {...props}>{children}</StyledDiagramIconButton>;
};
