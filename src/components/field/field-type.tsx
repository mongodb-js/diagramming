import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, spacing as LGSpacing } from '@leafygreen-ui/tokens';
import { Select, Option } from '@leafygreen-ui/select';
import Icon from '@leafygreen-ui/icon';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ellipsisTruncation } from '@/styles/styles';
import { FieldTypeContent } from '@/components/field/field-type-content';
import { FieldId } from '@/types';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';

const FieldTypeWrapper = styled.div`
  color: ${props => props.color};
  font-weight: normal;
  padding-left:${LGSpacing[100]}px;
  padding-right ${LGSpacing[50]}px; 
  flex: 0 0 ${LGSpacing[200] * 10}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FieldContentWrapper = styled.div`
  max-width: ${LGSpacing[200] * 10}px;
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

const SELECT_POPOVER_ID = 'lg-field-type-select';

export function FieldType({
  id,
  type,
  nodeId,
  isDisabled,
  isEditable,
}: {
  id: FieldId;
  nodeId: string;
  type: string | string[] | undefined;
  isDisabled: boolean;
  isEditable: boolean;
}) {
  const internalTheme = useTheme();
  const { theme } = useDarkMode();
  const { onChangeFieldType, fieldTypes } = useEditableDiagramInteractions();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const fieldTypeRef = useRef<HTMLDivElement>(null);

  const getSecondaryTextColor = () => {
    if (isDisabled) {
      return internalTheme.node.disabledColor;
    }
    return color[theme].text.secondary.default;
  };

  const isFieldTypeEditable = useMemo(() => {
    return isEditable && !isDisabled && !!onChangeFieldType && (fieldTypes ?? []).length > 0;
  }, [onChangeFieldType, isDisabled, isEditable, fieldTypes]);

  useEffect(() => {
    const container = fieldTypeRef.current;
    // Listener to close the select popover when clicking outside
    const listener = (event: Event) => {
      const popover = document.querySelector(`[data-lgid="${SELECT_POPOVER_ID}-popover"]`);
      if (!popover) {
        return;
      }
      // Event from popover or the container itself. Do nothing
      if (event.composedPath().includes(container!) || event.composedPath().includes(popover)) {
        return;
      }
      setIsSelectOpen(false);
    };

    if (container && isFieldTypeEditable) {
      document.addEventListener('click', listener);
    } else {
      document.removeEventListener('click', listener);
    }
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [isFieldTypeEditable]);

  return (
    <FieldTypeWrapper
      ref={fieldTypeRef}
      {...(isFieldTypeEditable
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
      {isFieldTypeEditable && (
        <StyledSelect
          aria-label="Select field type"
          size="xsmall"
          renderMode="portal"
          open={isSelectOpen}
          onChange={val => {
            if (val) {
              onChangeFieldType?.(nodeId, Array.isArray(id) ? id : [id], val);
              setIsSelectOpen(false);
            }
          }}
          // As its not multi-select, we can just use the first value. Once LG-5657
          // is implemented, we can use ComboBox component for multi-select support
          value={Array.isArray(type) ? type[0] : type || ''}
          allowDeselect={false}
          dropdownWidthBasis="option"
          data-lgid={SELECT_POPOVER_ID}
        >
          {fieldTypes!.map(fieldType => (
            <Option key={fieldType} value={fieldType}>
              {fieldType}
            </Option>
          ))}
        </StyledSelect>
      )}
      <FieldContentWrapper>
        <FieldTypeContent type={type} nodeId={nodeId} id={id} />
      </FieldContentWrapper>
      {isFieldTypeEditable && (
        <CaretIconWrapper title="Select field type" aria-label="Select field type">
          <Icon glyph="CaretDown" />
        </CaretIconWrapper>
      )}
    </FieldTypeWrapper>
  );
}
