import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, spacing as LGSpacing } from '@leafygreen-ui/tokens';
import { Select, Option } from '@leafygreen-ui/select';
import Icon from '@leafygreen-ui/icon';
import { useMemo, useState } from 'react';

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

export function FieldType({
  id,
  type,
  nodeId,
  isDisabled,
  isSelected,
}: {
  id: FieldId;
  nodeId: string;
  type: string | string[] | undefined;
  isDisabled: boolean;
  isSelected: boolean;
}) {
  const internalTheme = useTheme();
  const { theme } = useDarkMode();
  const { onChangeFieldType, fieldTypes } = useEditableDiagramInteractions();
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const getSecondaryTextColor = () => {
    if (isDisabled) {
      return internalTheme.node.disabledColor;
    }
    return color[theme].text.secondary.default;
  };

  const isFieldTypeEditable = useMemo(() => {
    return isSelected && !isDisabled && !!onChangeFieldType && (fieldTypes ?? []).length > 0;
  }, [onChangeFieldType, isDisabled, isSelected, fieldTypes]);

  return (
    <FieldTypeWrapper
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
          setOpen={setIsSelectOpen}
          onChange={val => {
            if (val) {
              onChangeFieldType?.(nodeId, Array.isArray(id) ? id : [id], val);
            }
          }}
          // As its not multi-select, we can just use the first value
          value={Array.isArray(type) ? type[0] : type || ''}
          allowDeselect={false}
          dropdownWidthBasis="option"
          justify="middle"
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
        <CaretIconWrapper title="Select field type">
          <Icon glyph="CaretDown" />
        </CaretIconWrapper>
      )}
    </FieldTypeWrapper>
  );
}
