import styled from '@emotion/styled';
import { color, fontWeights, spacing as LGSpacing } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useTheme } from '@emotion/react';
import { useCallback, useMemo } from 'react';

import { animatedBlueBorder, ellipsisTruncation } from '@/styles/styles';
import { DEFAULT_DEPTH_SPACING, DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';
import { FieldDepth } from '@/components/field/field-depth';
import { FieldTypeContent } from '@/components/field/field-type-content';
import { FieldId, NodeField, NodeGlyph, NodeType } from '@/types';
import { PreviewGroupArea } from '@/utilities/get-preview-group-area';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';

import { FieldNameContent } from './field-name-content';

const FIELD_BORDER_ANIMATED_PADDING = LGSpacing[100];
const FIELD_GLYPH_SPACING = LGSpacing[400];

const GlyphToIcon: Record<NodeGlyph, string> = {
  key: 'Key',
  link: 'Link',
};

const SELECTED_FIELD_BORDER_PADDING = LGSpacing[100];

const FieldWrapper = styled.div<{
  color: string;
  selectableHoverBackgroundColor?: string;
  selectable?: boolean;
  selected?: boolean;
  selectedGroupHeight: number;
}>`
  display: flex;
  align-items: center;
  width: auto;
  height: ${DEFAULT_FIELD_HEIGHT}px;
  color: ${props => props.color};
  padding-left: ${LGSpacing[200]}px;
  ${props =>
    props.selectable &&
    `&:hover {
    cursor: pointer;
    background-color: ${props.selectableHoverBackgroundColor};
    box-shadow: -${LGSpacing[100]}px 0px 0px 0px ${props.selectableHoverBackgroundColor}, ${LGSpacing[100]}px 0px 0px 0px ${props.selectableHoverBackgroundColor};
  }`}
  ${props =>
    props.selected &&
    `
    position: relative;

    &::before {
      content: '';
      pointer-events: none;
      position: absolute;
      outline: 2px solid ${palette.blue.base};
      width: calc(100% + ${SELECTED_FIELD_BORDER_PADDING * 2}px);
      border-radius: ${LGSpacing[50]}px;
      height: ${props.selectedGroupHeight * DEFAULT_FIELD_HEIGHT}px;
      left: -${SELECTED_FIELD_BORDER_PADDING}px;
      top: 0px;
    }
`}
`;

const InnerFieldWrapper = styled.div<{ width: number }>`
  display: flex;
  justify-content: flex-start;
  flex: 0 0 auto;
  width: ${props => `${props.width * FIELD_GLYPH_SPACING}px`};
`;

const FieldBorderAnimated = styled.div<{ height: string; left: string; width: string }>`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.height};
    left: calc(${props => props.left} - ${FIELD_BORDER_ANIMATED_PADDING}px);
    top: ${FIELD_BORDER_ANIMATED_PADDING / 2 - FIELD_BORDER_ANIMATED_PADDING}px;
    ${animatedBlueBorder};
  }
`;

const FieldBorder = styled(FieldBorderAnimated)`
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
`;

const FieldRow = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
`;

const FieldName = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  font-weight: ${fontWeights.medium};
  ${ellipsisTruncation}
`;

const FieldType = styled.div`
  color: ${props => props.color};
  flex: 0 0 100px;
  font-weight: normal;
  text-align: right;
  padding-left: ${LGSpacing[100]}px;
`;

const IconWrapper = styled(Icon)`
  padding-right: ${LGSpacing[100]}px;
  flex-shrink: 0;
`;

interface Props extends NodeField {
  id: FieldId;
  nodeId: string;
  nodeType: NodeType;
  spacing: number;
  isHovering?: boolean;
  previewGroupArea: PreviewGroupArea;
  selectedGroupHeight?: number;
}

export const Field = ({
  hoverVariant,
  isHovering = false,
  name,
  nodeId,
  id,
  depth = 0,
  type,
  nodeType,
  glyphs = [],
  selectedGroupHeight = 0,
  previewGroupArea,
  glyphSize = LGSpacing[300],
  spacing = 0,
  selectable = false,
  selected = false,
  editable = false,
  variant,
  expanded = false,
}: Props) => {
  const { theme } = useDarkMode();

  const { onClickField, onChangeFieldName } = useEditableDiagramInteractions();

  const internalTheme = useTheme();

  const isDisabled = variant === 'disabled' && !(hoverVariant === 'default' && isHovering);

  const getSelectableHoverBackgroundColor = () => {
    return fieldSelectionProps?.selectable ? color[theme].background.primary.hover : undefined;
  };

  /**
   * Create the field selection props when the field is selectable.
   */
  const fieldSelectionProps = useMemo(() => {
    return selectable && !!onClickField
      ? {
          'data-testid': `selectable-field-${nodeId}-${typeof id === 'string' ? id : id.join('.')}`,
          selectable: true,
          onClick: (event: React.MouseEvent) => onClickField(event, { id, nodeId }),
        }
      : undefined;
  }, [onClickField, selectable, id, nodeId]);

  const getTextColor = () => {
    if (isDisabled) {
      return internalTheme.node.disabledColor;
    } else {
      return color[theme].text.primary.default;
    }
  };

  const getSecondaryTextColor = () => {
    if (isDisabled) {
      return internalTheme.node.disabledColor;
    } else {
      return color[theme].text.secondary.default;
    }
  };

  const getIconColor = (glyph: NodeGlyph) => {
    if (isDisabled) {
      return color[theme].text.disabled.default;
    } else if (variant === 'primary' && glyph === 'key') {
      return palette.blue.base;
    } else {
      return glyph === 'key' ? getAccent() : internalTheme.node.icon;
    }
  };

  const getAccent = () => {
    if (isDisabled) {
      return internalTheme.node.disabledAccent;
    } else if (nodeType === 'table') {
      return internalTheme.node.relationalAccent;
    }
    return internalTheme.node.mongoDBAccent;
  };

  const handleNameChange = useCallback(
    (newName: string) => onChangeFieldName?.(nodeId, Array.isArray(id) ? id : [id], newName),
    [onChangeFieldName, id, nodeId],
  );

  const content = (
    <>
      <FieldName>
        <FieldDepth depth={depth} />
        <FieldNameContent
          name={name}
          isEditable={editable}
          onChange={onChangeFieldName ? handleNameChange : undefined}
        />
      </FieldName>
      <FieldType color={getSecondaryTextColor()}>
        <FieldTypeContent type={type} nodeId={nodeId} id={id} expanded={expanded} />
      </FieldType>
    </>
  );

  /**
   * Sets how much the preview border needs to offset by, by the maximum number of glyphs in that area.
   */
  const previewWidthGlyphOffset = FIELD_GLYPH_SPACING * previewGroupArea.width;

  /**
   * Set the height based on the number of fields in preview multiplied by the default field height.
   * Add some padding.
   */
  const previewBorderHeight = `${previewGroupArea.height * DEFAULT_FIELD_HEIGHT + FIELD_BORDER_ANIMATED_PADDING}px`;

  /**
   * Set the width to 100%.
   * Increase the width to cover any glyphs.
   * Decrease the width if the field is nested.
   * Add some padding.
   */
  const previewBorderWidth = `calc(100% + ${
    previewWidthGlyphOffset - depth * FIELD_BORDER_ANIMATED_PADDING * 2 + FIELD_BORDER_ANIMATED_PADDING * 2
  }px)`;

  /**
   * Inset the border to the right if the field is nested.
   * Inset the border to the left if the field has glyphs.
   */
  const previewBorderLeft = `${depth * DEFAULT_DEPTH_SPACING - previewWidthGlyphOffset}px`;

  return (
    <FieldWrapper
      selected={selected}
      color={getTextColor()}
      selectableHoverBackgroundColor={getSelectableHoverBackgroundColor()}
      selectedGroupHeight={selectedGroupHeight}
      {...fieldSelectionProps}
    >
      <InnerFieldWrapper width={spacing}>
        {glyphs.map(glyph => (
          <IconWrapper key={glyph} color={getIconColor(glyph)} glyph={GlyphToIcon[glyph]} size={glyphSize} />
        ))}
      </InnerFieldWrapper>
      {previewGroupArea.height ? (
        <FieldBorder
          data-testid={`preview-border-${name}`}
          height={previewBorderHeight}
          left={previewBorderLeft}
          width={previewBorderWidth}
        >
          {content}
        </FieldBorder>
      ) : (
        <FieldRow>{content}</FieldRow>
      )}
    </FieldWrapper>
  );
};
