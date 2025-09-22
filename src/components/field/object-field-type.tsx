import { useCallback } from 'react';
import styled from '@emotion/styled';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';

import { PlusWithSquare } from '@/components/icons/plus-with-square';

const ObjectTypeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 20px;
`;

const AddNestedFieldIconButton = styled.button`
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
    color: ${props => props.theme.node.fieldIconButtonHover};

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

type ObjectFieldTypeProps = {
  onClickAddFieldToObject: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ['data-testid']: string;
};

export const ObjectFieldType = ({
  'data-testid': dataTestId,
  onClickAddFieldToObject: _onClickAddFieldToObject,
}: ObjectFieldTypeProps) => {
  const onClickAddFieldToObject = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // Don't click on the field element.
      event.stopPropagation();
      _onClickAddFieldToObject(event);
    },
    [_onClickAddFieldToObject],
  );

  return (
    <ObjectTypeContainer>
      {'{}'}
      <AddNestedFieldIconButton
        data-testid={dataTestId}
        onClick={onClickAddFieldToObject}
        aria-label="Add new field"
        title="Add Field"
      >
        <PlusWithSquare />
      </AddNestedFieldIconButton>
    </ObjectTypeContainer>
  );
};
