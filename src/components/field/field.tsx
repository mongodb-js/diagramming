import styled from '@emotion/styled';
import { color, fontWeights, spacing as LGSpacing, spacing } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { ellipsisTruncation } from '@/styles/styles';
import { DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';
import { FieldDepth } from '@/components/field/field-depth';
import { NodeField, NodeGlyph } from '@/types';

const GlyphToIcon: Record<NodeGlyph, string> = {
  key: 'Key',
  link: 'Link',
};

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: ${DEFAULT_FIELD_HEIGHT}px;
`;

const InnerFieldWrapper = styled.div<{ width: number }>`
  display: flex;
  justify-content: flex-end;
  flex: 0 0 auto;
  width: ${props => `${props.width * spacing[400]}px`};
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
`;

interface Props extends NodeField {
  accent: string;
  spacing: number;
}

export const Field = ({ name, depth, type, glyphs, accent, spacing }: Props) => {
  const { theme } = useDarkMode();

  const getIconColor = (glyph: NodeGlyph) => {
    return glyph === 'key' ? accent : palette.gray.light1;
  };

  return (
    <FieldWrapper>
      <InnerFieldWrapper width={spacing}>
        {glyphs?.map(glyph => (
          <IconWrapper key={glyph} size={11} color={getIconColor(glyph)} glyph={GlyphToIcon[glyph]} />
        ))}
      </InnerFieldWrapper>
      <FieldName>
        <FieldDepth depth={depth || 0} />
        <InnerFieldName>{name}</InnerFieldName>
      </FieldName>
      <FieldType color={color[theme].text.secondary.default}>{type}</FieldType>
    </FieldWrapper>
  );
};
