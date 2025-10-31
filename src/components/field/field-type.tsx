import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { spacing, color } from '@leafygreen-ui/tokens';
import { Select, Option } from '@leafygreen-ui/select';
import Icon from '@leafygreen-ui/icon';
import { useEffect, useRef, useState } from 'react';

import { ellipsisTruncation } from '@/styles/styles';
import { FieldTypeContent } from '@/components/field/field-type-content';
import { FieldId } from '@/types';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';

const FieldTypeWrapper = styled.div<{ color: string }>`
  color: ${props => props.color};
  font-weight: normal;
  padding-left:${spacing[100]}px;
  padding-right ${spacing[50]}px; 
  flex: 0 0 ${spacing[200] * 10}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FieldContentWrapper = styled.div`
  max-width: ${spacing[200] * 10}px;
  ${ellipsisTruncation}
`;

const CaretIconWrapper = styled.div`
  display: flex;
`;

const StyledSelect = styled(Select)`
  visibility: hidden;
  height: 0;
  width: 0;
  & > button {
    height: 0;
    width: 0;
    border: none;
    box-shadow: none;
  }
`;

export function FieldType({
  id,
  type,
  nodeId,
  isEditing,
  isDisabled,
  onChange,
}: {
  id: FieldId;
  nodeId: string;
  type: string | string[] | undefined;
  isEditing: boolean;
  isDisabled: boolean;
  onChange?: (newType: string[]) => void;
}) {
  const internalTheme = useTheme();
  const { theme } = useDarkMode();
  const { fieldTypes } = useEditableDiagramInteractions();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const fieldTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setIsSelectOpen(false);
    }
  }, [isEditing]);

  const getSecondaryTextColor = () => {
    if (isDisabled) {
      return internalTheme.node.disabledColor;
    }
    return color[theme].text.secondary.default;
  };

  return (
    <FieldTypeWrapper
      ref={fieldTypeRef}
      {...(isEditing
        ? {
            onClick: () => setIsSelectOpen(!isSelectOpen),
          }
        : undefined)}
      color={getSecondaryTextColor()}
    >
      {/**
       * Rendering hidden select first so that whenever popover shows it, its relative
       * to the field type position. LG Select does not provide a way to set the
       * position of the popover using refs.
       */}
      {isEditing && (
        <StyledSelect
          aria-label="Select field type"
          size="xsmall"
          renderMode="portal"
          open={isSelectOpen}
          onChange={val => {
            if (val) {
              // Currently its a single select, so we are returning it as an array.
              // That way once we have multi-select support, we don't need to change
              // the API and it should work seemlessly for clients.
              // Trigger onChange only if the value is different
              if (type !== val) {
                onChange?.([val]);
              }
              setIsSelectOpen(false);
            }
          }}
          // As its not multi-select, we can just use the first value. Once LG-5657
          // is implemented, we can use ComboBox component for multi-select support
          value={Array.isArray(type) ? type[0] : type || ''}
          allowDeselect={false}
          dropdownWidthBasis="option"
          tabIndex={0}
        >
          {fieldTypes!.map(fieldType => (
            <Option key={fieldType} value={fieldType}>
              {fieldType}
            </Option>
          ))}
        </StyledSelect>
      )}
      <FieldContentWrapper>
        <FieldTypeContent type={type} nodeId={nodeId} id={id} isAddFieldToObjectDisabled={isEditing} />
      </FieldContentWrapper>
      {isEditing && (
        <CaretIconWrapper title="Select field type" aria-label="Select field type">
          <Icon glyph="CaretDown" />
        </CaretIconWrapper>
      )}
    </FieldTypeWrapper>
  );
}
