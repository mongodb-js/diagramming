import { useMemo } from 'react';
import styled from '@emotion/styled';

import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';
import { PlusWithSquare } from '@/components/icons/plus-with-square';
import { DiagramIconButton } from '@/components/buttons/diagram-icon-button';

const ObjectTypeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 20px;
`;

export const FieldTypeContent = ({
  type,
  nodeId,
  id,
}: {
  id: string | string[];
  nodeId: string;
  type: React.ReactNode;
}) => {
  const { onClickAddFieldToObjectField: _onClickAddFieldToObjectField } = useEditableDiagramInteractions();

  const onClickAddFieldToObject = useMemo(
    () =>
      _onClickAddFieldToObjectField
        ? (event: React.MouseEvent<HTMLButtonElement>) => {
            // Don't click on the field element.
            event.stopPropagation();
            _onClickAddFieldToObjectField(event, nodeId, Array.isArray(id) ? id : [id]);
          }
        : undefined,
    [_onClickAddFieldToObjectField, nodeId, id],
  );

  if (type === 'object') {
    return (
      <ObjectTypeContainer>
        {'{}'}
        {onClickAddFieldToObject && (
          <DiagramIconButton
            data-testid={`object-field-type-${nodeId}-${typeof id === 'string' ? id : id.join('.')}`}
            onClick={onClickAddFieldToObject}
            aria-label="Add new field"
            title="Add Field"
          >
            <PlusWithSquare />
          </DiagramIconButton>
        )}
      </ObjectTypeContainer>
    );
  }

  if (type === 'array') {
    return '[]';
  }

  return <>{type}</>;
};
