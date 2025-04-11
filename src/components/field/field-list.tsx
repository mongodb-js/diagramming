import styled from '@emotion/styled';
import { spacing } from '@leafygreen-ui/tokens';

import { Field } from '@/components/field/field';
import { NodeField } from '@/types';
import { getPreviewGroupLengths } from '@/utilities/get-preview-group-lengths';
import { DEFAULT_FIELD_PADDING } from '@/utilities/constants';

const NodeFieldWrapper = styled.div`
  padding: ${DEFAULT_FIELD_PADDING}px ${spacing[400]}px ${DEFAULT_FIELD_PADDING}px ${spacing[400]}px;
  font-size: 12px;
`;

interface Props {
  accent: string;
  fields: Array<NodeField>;
}

export const FieldList = ({ fields, accent }: Props) => {
  const spacing = Math.max(0, ...fields.map(field => field.glyphs?.length || 0));
  const previewGroupLength = getPreviewGroupLengths(fields);
  return (
    <NodeFieldWrapper>
      {fields.map(({ name, type: fieldType, depth, glyphs, variant }) => (
        <Field
          key={name}
          name={name}
          depth={depth}
          previewGroupLength={previewGroupLength[name]}
          accent={accent}
          glyphs={glyphs}
          type={fieldType}
          spacing={spacing}
          variant={variant}
        />
      ))}
    </NodeFieldWrapper>
  );
};
