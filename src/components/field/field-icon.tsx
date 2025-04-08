import Icon from '@leafygreen-ui/icon';
import styled from '@emotion/styled';
import { spacing } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';

import { NodeGlyph } from '@/types';

const IconWrapper = styled(Icon)`
  padding-right: ${spacing[100]}px;
`;

interface GlyphMetadataArgs {
  glyph: string;
  color: string;
}

interface Props {
  primaryColor: string;
  glyph: NodeGlyph;
}

export const FieldIcon = ({ primaryColor, glyph }: Props) => {
  const GlyphMetadata: Record<NodeGlyph, GlyphMetadataArgs> = {
    key: {
      glyph: 'Key',
      color: primaryColor,
    },
    link: {
      glyph: 'Link',
      color: palette.gray.light1,
    },
  };
  return <IconWrapper size={11} color={GlyphMetadata[glyph].color} glyph={GlyphMetadata[glyph].glyph} />;
};
