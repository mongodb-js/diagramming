import styled from '@emotion/styled';
import { spacing } from '@leafygreen-ui/tokens';

import { Field } from '@/components/field/field';
import { NodeField, NodeType } from '@/types';
import { DEFAULT_PREVIEW_GROUP_AREA, getPreviewGroupArea, getPreviewId } from '@/utilities/get-preview-group-area';
import { DEFAULT_FIELD_PADDING } from '@/utilities/constants';

const NodeFieldWrapper = styled.div`
  padding: ${DEFAULT_FIELD_PADDING}px ${spacing[400]}px;
  font-size: 12px;
`;

interface Props {
  nodeType: NodeType;
  isHovering?: boolean;
  fields: NodeField[];
}

export const FieldList = ({ fields, nodeType, isHovering }: Props) => {
  const spacing = Math.max(0, ...fields.map(field => field.glyphs?.length || 0));
  const previewGroupArea = getPreviewGroupArea(fields);
  return (
    <NodeFieldWrapper>
      {fields.map(({ name, type: fieldType, ...rest }, i) => (
        <Field
          key={i}
          name={name}
          nodeType={nodeType}
          isHovering={isHovering}
          previewGroupArea={previewGroupArea[getPreviewId(i, name)] || DEFAULT_PREVIEW_GROUP_AREA}
          type={fieldType}
          spacing={spacing}
          {...rest}
        />
      ))}
    </NodeFieldWrapper>
  );
};
