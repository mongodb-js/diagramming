import styled from '@emotion/styled';
import { fontWeights } from '@leafygreen-ui/tokens';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ellipsisTruncation } from '@/styles/styles';
import { FieldDepth } from '@/components/field/field-depth';
import { FieldType } from '@/components/field/field-type';
import { FieldId, NodeField } from '@/types';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';

import { FieldNameContent } from './field-name-content';

const FieldContentWrapper = styled.div`
  display: contents;
`;

const FieldName = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  font-weight: ${fontWeights.medium};
  ${ellipsisTruncation};
`;

interface FieldContentProps extends NodeField {
  id: FieldId;
  isEditable: boolean;
  isDisabled: boolean;
  nodeId: string;
}

export const FieldContent = ({ isEditable, isDisabled, depth = 0, name, type, id, nodeId }: FieldContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const fieldContentRef = useRef<HTMLDivElement>(null);

  const { onChangeFieldName, onChangeFieldType, fieldTypes } = useEditableDiagramInteractions();
  const handleNameChange = useCallback(
    (newName: string) => onChangeFieldName?.(nodeId, Array.isArray(id) ? id : [id], newName),
    [onChangeFieldName, id, nodeId],
  );
  const handleTypeChange = useCallback(
    (newType: string[]) => onChangeFieldType?.(nodeId, Array.isArray(id) ? id : [id], newType),
    [onChangeFieldType, id, nodeId],
  );

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    // When clicking outside of the field content while editing, stop editing.
    const container = fieldContentRef.current;
    const listener = (event: Event) => {
      if (event.composedPath().includes(container!)) {
        return;
      }
      setIsEditing(false);
    };

    if (container && isEditable) {
      document.addEventListener('click', listener);
    } else {
      document.removeEventListener('click', listener);
    }
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [isEditable]);

  useEffect(() => {
    if (!isEditable) {
      setIsEditing(false);
    }
  }, [isEditable]);

  const isNameEditable = isEditing && isEditable && !!onChangeFieldName;
  const isTypeEditable = isEditing && isEditable && !!onChangeFieldType && (fieldTypes ?? []).length > 0;

  return (
    <FieldContentWrapper
      data-testid={`field-content-${name}`}
      onDoubleClick={isEditable ? handleDoubleClick : undefined}
      ref={fieldContentRef}
    >
      <FieldName>
        <FieldDepth depth={depth} />
        <FieldNameContent
          name={name}
          isEditing={isNameEditable}
          onChange={handleNameChange}
          onCancelEditing={() => setIsEditing(false)}
        />
      </FieldName>
      <FieldType
        type={type}
        nodeId={nodeId}
        id={id}
        isEditing={isTypeEditable}
        isDisabled={isDisabled}
        onChange={handleTypeChange}
      />
    </FieldContentWrapper>
  );
};
