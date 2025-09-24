import { styled } from 'storybook/internal/theming';
import { useCallback, useState } from 'react';

import { ellipsisTruncation } from '@/styles/styles';
import { DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';

const InnerFieldName = styled.div`
  ${ellipsisTruncation}
`;

const InlineTextarea = styled.textarea`
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

  const handleSubmit = useCallback(() => {
    setIsEditing(false);
    onChange?.(value);
  }, [value, onChange]);

  return isEditing ? (
    <InlineTextarea
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
      onBlur={handleSubmit}
      onKeyDown={e => {
        if (e.key === 'Enter') handleSubmit();
        if (e.key === 'Escape') setIsEditing(false);
      }}
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
