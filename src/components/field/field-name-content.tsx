import { styled } from 'storybook/internal/theming';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ellipsisTruncation } from '@/styles/styles';
import { DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';

const InnerFieldName = styled.div`
  width: 100%;
  min-height: ${DEFAULT_FIELD_HEIGHT}px;
  ${ellipsisTruncation}
`;

const InlineInput = styled.input`
  border: none;
  background: none;
  height: ${DEFAULT_FIELD_HEIGHT}px;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  font-style: inherit;
`;

interface FieldNameProps {
  name: string;
  isEditable?: boolean;
  onChange?: (newName: string) => void;
  onBlur?: () => void;
}

export const FieldNameContent = ({ name, isEditable, onChange }: FieldNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    setIsEditing(false);
    onChange?.(value);
  }, [value, onChange]);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        textInputRef.current?.focus();
        textInputRef.current?.select();
      });
    }
  }, [isEditing]);

  return isEditing ? (
    <InlineInput
      type="text"
      ref={textInputRef}
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
      onBlur={handleSubmit}
      onKeyDown={e => {
        if (e.key === 'Enter') handleSubmit();
        if (e.key === 'Escape') setIsEditing(false);
      }}
      title="Edit field name"
    />
  ) : (
    <InnerFieldName
      onDoubleClick={
        onChange && isEditable
          ? () => {
              setIsEditing(true);
            }
          : undefined
      }
    >
      {value}
    </InnerFieldName>
  );
};
