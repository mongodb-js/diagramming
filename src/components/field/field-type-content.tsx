import { useMemo } from 'react';
import styled from '@emotion/styled';
import LeafyGreenInlineDefinition from '@leafygreen-ui/inline-definition';
import { Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import { useTheme } from '@emotion/react';
import { spacing } from '@leafygreen-ui/tokens';

import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';
import { PlusWithSquare } from '@/components/icons/plus-with-square';
import { DiagramIconButton } from '@/components/buttons/diagram-icon-button';
import { COLLAPSE_BUTTON_SPACE } from '@/utilities/constants';

const ObjectTypeContainer = styled.div<{ hasCollapseFunctionality?: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 20px;
  ${props => !props.hasCollapseFunctionality && `padding-right: ${spacing[200]}px`}
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

const FIELD_TYPE_SPACE = 100;

const TextContainer = styled.span`
  flex: 0 0 ${FIELD_TYPE_SPACE - COLLAPSE_BUTTON_SPACE}px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: right;
`;

const NonObjectTypeContainer = styled.span<{ hasCollapseFunctionality: boolean }>`
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
  justify-content: flex-end;
  max-width: ${FIELD_TYPE_SPACE}px;
  white-space: nowrap;

  ${props =>
    props.hasCollapseFunctionality
      ? `
        &::after {
          content: '\u00A0';
          visibility: hidden;
          flex: 0 0 ${COLLAPSE_BUTTON_SPACE}px;
        }
      `
      : `padding-right: ${spacing[200]}px}`}
`;

const NonObjectTypeContent = ({
  children,
  hasCollapseFunctionality,
}: {
  children: React.ReactNode;
  hasCollapseFunctionality: boolean;
}) => {
  return (
    <NonObjectTypeContainer hasCollapseFunctionality={hasCollapseFunctionality}>
      <TextContainer>{children}</TextContainer>
    </NonObjectTypeContainer>
  );
};

export const FieldTypeContent = ({
  type,
  nodeId,
  id,
  expanded,
}: {
  id: string | string[];
  nodeId: string;
  type?: string | string[];
  expanded?: boolean;
}) => {
  const theme = useTheme();
  const { onClickAddFieldToObjectField: _onClickAddFieldToObjectField, onFieldExpandToggle: _onFieldExpandToggle } =
    useEditableDiagramInteractions();

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

  const onFieldExpandToggle = useMemo(
    () =>
      _onFieldExpandToggle
        ? (event: React.MouseEvent<HTMLButtonElement>) => {
            // Don't click on the field element.
            event.stopPropagation();
            _onFieldExpandToggle(event, nodeId, Array.isArray(id) ? id : [id]);
          }
        : undefined,
    [_onFieldExpandToggle, nodeId, id],
  );

  if (type === 'object') {
    return (
      <ObjectTypeContainer hasCollapseFunctionality={!!onFieldExpandToggle}>
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
        {onFieldExpandToggle && (
          <DiagramIconButton
            data-testid={`object-field-expand-toggle-${nodeId}-${typeof id === 'string' ? id : id.join('.')}`}
            onClick={onFieldExpandToggle}
            aria-label={expanded ? 'Collapse Field' : 'Expand Field'}
            title={expanded ? 'Collapse Field' : 'Expand Field'}
          >
            <Icon glyph={expanded ? 'ChevronDown' : 'ChevronLeft'} color={theme.node.fieldIconButton} size={14} />
          </DiagramIconButton>
        )}
      </ObjectTypeContainer>
    );
  }

  if (type === 'array') {
    return <NonObjectTypeContent hasCollapseFunctionality={!!onFieldExpandToggle}>[]</NonObjectTypeContent>;
  }

  if (Array.isArray(type)) {
    if (type.length === 0) {
      return <NonObjectTypeContent hasCollapseFunctionality={!!onFieldExpandToggle}>unknown</NonObjectTypeContent>;
    }

    if (type.length === 1) {
      return <NonObjectTypeContent hasCollapseFunctionality={!!onFieldExpandToggle}>{type}</NonObjectTypeContent>;
    }

    const typesString = type.join(', ');

    // We show `mixed` with a tooltip when multiple types exist.
    return (
      <NonObjectTypeContent hasCollapseFunctionality={!!onFieldExpandToggle}>
        <InlineDefinition
          definition={<MixedTypeTooltipContentStyles>Multiple types: {typesString}</MixedTypeTooltipContentStyles>}
        >
          (mixed)
        </InlineDefinition>
      </NonObjectTypeContent>
    );
  }

  return <NonObjectTypeContent hasCollapseFunctionality={!!onFieldExpandToggle}>{type}</NonObjectTypeContent>;
};
