import { useMemo } from 'react';

import { ObjectFieldType } from '@/components/field/object-field-type';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';

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
            event.stopPropagation();
            _onClickAddFieldToObjectField(event, nodeId, Array.isArray(id) ? id : [id]);
          }
        : undefined,
    [_onClickAddFieldToObjectField, nodeId, id],
  );

  if (type === 'object' && !!onClickAddFieldToObject) {
    return (
      <ObjectFieldType
        data-testid={`object-field-type-${nodeId}-${typeof id === 'string' ? id : id.join('.')}`}
        onClickAddFieldToObject={onClickAddFieldToObject}
      />
    );
  }

  return <>{type}</>;
};
