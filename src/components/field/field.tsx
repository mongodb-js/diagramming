import styled from '@emotion/styled';
import { color as LGColor, fontWeights, spacing, spacing as LGSpacing } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { ellipsisTruncation } from '@/styles/styles';
import { DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';
import { FieldIcon } from '@/components/field/field-icon';
import { FieldDepth } from '@/components/field/field-depth';
import { NodeField } from '@/types';

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

interface Props extends NodeField {
  color: string;
  spacing: number;
}

export const Field = ({ name, depth, type, glyphs, color, spacing }: Props) => {
  const { theme } = useDarkMode();

  const secondaryColor = LGColor[theme].text.secondary.default;

  return (
    <FieldWrapper>
      <InnerFieldWrapper width={spacing}>
        {glyphs?.map(glyph => (
          <FieldIcon key={glyph} primaryColor={color} glyph={glyph} />
        ))}
      </InnerFieldWrapper>
      <FieldName>
        <FieldDepth depth={depth || 0} />
        <InnerFieldName>{name}</InnerFieldName>
      </FieldName>
      <FieldType color={secondaryColor}>{type}</FieldType>
    </FieldWrapper>
  );
};
