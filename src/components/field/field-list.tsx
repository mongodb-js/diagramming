import { useMemo } from 'react';
import styled from '@emotion/styled';

import { Field } from '@/components/field/field';
import { NodeType } from '@/types/node';
import { DEFAULT_PREVIEW_GROUP_AREA, getPreviewGroupArea, getPreviewId } from '@/utilities/get-preview-group-area';
import { DEFAULT_FIELD_PADDING } from '@/utilities/constants';
import { getSelectedFieldGroupHeight, getSelectedId } from '@/utilities/get-selected-field-group-height';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';
import { InternalNodeField } from '@/types/internal';

const NodeFieldWrapper = styled.div`
  padding: ${DEFAULT_FIELD_PADDING}px;
  font-size: 12px;
`;

interface Props {
  nodeType: NodeType;
  isHovering?: boolean;
  nodeId: string;
  fields: InternalNodeField[];
}

export const FieldList = ({ fields, nodeId, nodeType, isHovering }: Props) => {
  const { onClickField } = useEditableDiagramInteractions();
  const isFieldSelectionEnabled = !!onClickField;

  const spacing = Math.max(0, ...fields.map(field => field.glyphs?.length || 0));
  const previewGroupArea = useMemo(() => getPreviewGroupArea(fields), [fields]);
  const selectedGroupHeight = useMemo(() => {
    return isFieldSelectionEnabled ? getSelectedFieldGroupHeight(fields) : undefined;
  }, [fields, isFieldSelectionEnabled]);

  return (
    <NodeFieldWrapper>
      {fields.map(({ id, name, type: fieldType, ...rest }, i) => {
        const key = id ? (Array.isArray(id) ? id.join('#') : id) : `${name}-${i}`;
        return (
          <Field
            key={key}
            id={id ?? name}
            name={name}
            nodeId={nodeId}
            nodeType={nodeType}
            isHovering={isHovering}
            previewGroupArea={previewGroupArea[getPreviewId(i, name)] || DEFAULT_PREVIEW_GROUP_AREA}
            selectedGroupHeight={selectedGroupHeight?.[getSelectedId(i, name)]}
            type={fieldType}
            spacing={spacing}
            {...rest}
          />
        );
      })}
    </NodeFieldWrapper>
  );
};
