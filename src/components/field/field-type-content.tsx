import { useMemo } from 'react';
import styled from '@emotion/styled';
import LeafyGreenInlineDefinition from '@leafygreen-ui/inline-definition';
import { Body } from '@leafygreen-ui/typography';

import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';
import { PlusWithSquare } from '@/components/icons/plus-with-square';
import { DiagramIconButton } from '@/components/buttons/diagram-icon-button';

const ObjectTypeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 20px;
`;

const MixedTypeTooltipContentStyles = styled(Body)`
  overflow-wrap: anywhere;
  text-wrap: wrap;
  text-align: left;
  font-style: normal;
`;

const InlineDefinition = styled(LeafyGreenInlineDefinition)`
  font-style: italic;
  text-decoration-color: inherit;
  text-underline-offset: 0.25em;
`;

export const FieldTypeContent = ({
  type,
  nodeId,
  id,
}: {
  id: string | string[];
  nodeId: string;
  type?: string | string[];
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

  if (Array.isArray(type)) {
    if (type.length === 0) {
      return 'unknown';
    }

    if (type.length === 1) {
      return <>{type}</>;
    }

    const typesString = type.join(', ');

    // We show `mixed` with a tooltip when multiple types exist.
    return (
      <InlineDefinition
        definition={<MixedTypeTooltipContentStyles>Multiple types: {typesString}</MixedTypeTooltipContentStyles>}
      >
        (mixed)
      </InlineDefinition>
    );
  }

  return <>{type}</>;
};
