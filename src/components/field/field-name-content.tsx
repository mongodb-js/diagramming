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
  width: 100%;
`;

interface FieldNameProps {
  name: string;
  isEditing: boolean;
  onChange: (newName: string) => void;
  onCancelEditing: () => void;
}

export const FieldNameContent = ({ name, isEditing, onChange, onCancelEditing }: FieldNameProps) => {
  const [value, setValue] = useState(name);
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(name);
  }, [name]);

  const handleSubmit = useCallback(() => {
    onChange(value);
  }, [value, onChange]);

  const handleKeyboardEvent = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSubmit();
      if (e.key === 'Escape') {
        setValue(name);
        onCancelEditing();
      }
    },
    [handleSubmit, onCancelEditing, name],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return isEditing ? (
    <InlineInput
      type="text"
      ref={textInputRef}
      value={value}
      onChange={handleChange}
      onBlur={handleSubmit}
      onKeyDown={handleKeyboardEvent}
      title="Edit field name"
    />
  ) : (
    <InnerFieldName title={value}>{value}</InnerFieldName>
  );
};
