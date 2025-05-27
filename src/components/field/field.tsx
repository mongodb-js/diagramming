import styled from '@emotion/styled';
import { color, fontWeights, spacing as LGSpacing, spacing } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useTheme } from '@emotion/react';

import { animatedBlueBorder, ellipsisTruncation } from '@/styles/styles';
import { DEFAULT_DEPTH_SPACING, DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';
import { FieldDepth } from '@/components/field/field-depth';
import { NodeField, NodeGlyph, NodeType } from '@/types';

const FIELD_BORDER_ANIMATED_PADDING = spacing[100];
const FIELD_GLYPH_SPACING = spacing[400];

const GlyphToIcon: Record<NodeGlyph, string> = {
  key: 'Key',
  link: 'Link',
};

const FieldWrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  width: auto;
  height: ${DEFAULT_FIELD_HEIGHT}px;
  color: ${props => props.color};
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

const InnerFieldName = styled.div`
  ${ellipsisTruncation}
`;

const FieldType = styled.div`
  color: ${props => props.color};
  flex: 0 0 ${LGSpacing[200] * 10}px;
  font-weight: normal;
  text-align: right;
  padding-left:${LGSpacing[100]}px;
  padding-right ${LGSpacing[50]}px; 
  ${ellipsisTruncation}
`;

const IconWrapper = styled(Icon)`
  padding-right: ${spacing[100]}px;
  flex-shrink: 0;
`;

interface Props extends NodeField {
  nodeType: NodeType;
  spacing: number;
  isHovering?: boolean;
  previewGroupLength?: number;
}

export const Field = ({
  hoverVariant,
  isHovering = false,
  name,
  depth = 0,
  type,
  nodeType,
  glyphs = [],
  glyphSize = LGSpacing[300],
  spacing = 0,
  variant,
  previewGroupLength = 0,
}: Props) => {
  const { theme } = useDarkMode();

  const internalTheme = useTheme();

  const isDisabled = variant === 'disabled' && !(hoverVariant === 'default' && isHovering);

  const getTextColor = () => {
    if (isDisabled) {
      return color[theme].text.disabled.default;
    } else {
      return color[theme].text.primary.default;
    }
  };

  const getSecondaryTextColor = () => {
    if (isDisabled) {
      return color[theme].text.disabled.default;
    } else {
      return color[theme].text.secondary.default;
    }
  };

  const getIconColor = (glyph: NodeGlyph) => {
    if (isDisabled) {
      return color[theme].text.disabled.default;
    } else if (variant === 'primary') {
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

  const content = (
    <>
      <FieldName>
        <FieldDepth depth={depth} />
        <InnerFieldName>{name}</InnerFieldName>
      </FieldName>
      <FieldType color={getSecondaryTextColor()}>{type}</FieldType>
    </>
  );

  /**
   * Set the height based on the number of fields in preview multiplied by the default field height.
   * Add some padding.
   */
  const previewBorderHeight = `${previewGroupLength * DEFAULT_FIELD_HEIGHT + FIELD_BORDER_ANIMATED_PADDING}px`;

  /**
   * Set the width to 100%.
   * Increase the width to cover any glyphs.
   * Decrease the width if the field is nested.
   * Add some padding.
   */
  const previewBorderWidth = `calc(100% + ${
    glyphs.length * FIELD_GLYPH_SPACING - depth * FIELD_BORDER_ANIMATED_PADDING * 2 + FIELD_BORDER_ANIMATED_PADDING * 2
  }px)`;

  /**
   * Inset the border to the right if the field is nested.
   * Inset the border to the left if the field has glyphs.
   */
  const previewBorderLeft = `${depth * DEFAULT_DEPTH_SPACING - glyphs.length * FIELD_GLYPH_SPACING}px`;

  return (
    <FieldWrapper color={getTextColor()}>
      <InnerFieldWrapper width={spacing}>
        {glyphs.map(glyph => (
          <IconWrapper key={glyph} color={getIconColor(glyph)} glyph={GlyphToIcon[glyph]} size={glyphSize} />
        ))}
      </InnerFieldWrapper>
      {previewGroupLength ? (
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
