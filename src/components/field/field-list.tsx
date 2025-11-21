import { useMemo } from 'react';
import styled from '@emotion/styled';

import { Field } from '@/components/field/field';
import { NodeField, NodeType } from '@/types';
import { DEFAULT_PREVIEW_GROUP_AREA, getPreviewGroupArea, getPreviewId } from '@/utilities/get-preview-group-area';
import { DEFAULT_FIELD_PADDING } from '@/utilities/constants';
import { getSelectedFieldGroupHeight, getSelectedId } from '@/utilities/get-selected-field-group-height';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';

const NodeFieldWrapper = styled.div`
  padding: ${DEFAULT_FIELD_PADDING}px;
  font-size: 12px;
`;

interface Props {
  nodeType: NodeType;
  isHovering?: boolean;
  nodeId: string;
  fields: NodeField[];
}

function hasChildren(fields: NodeField[], index: number): boolean {
  const fieldDepth = fields[index].depth ?? 0;
  const nextField = fields.length > index + 1 ? fields[index + 1] : null;
  if (!nextField) return false;
  return nextField.depth !== undefined && nextField.depth > fieldDepth;
}

function getVisibleFields(fields: NodeField[]): (NodeField & { expandable: boolean })[] {
  const visibleFields: (NodeField & { expandable: boolean })[] = [];
  let currentDepth = 0;
  let skipChildren = false;
  fields.forEach((field, index) => {
    const fieldDepth = field.depth ?? 0;
    if (skipChildren && fieldDepth > currentDepth) {
      return;
    }
    currentDepth = fieldDepth;
    skipChildren = field.expanded === false;
    visibleFields.push({
      ...field,
      expandable: hasChildren(fields, index),
    });
  });
  return visibleFields;
}

export const FieldList = ({ fields: allFields, nodeId, nodeType, isHovering }: Props) => {
  const { onClickField } = useEditableDiagramInteractions();
  const isFieldSelectionEnabled = !!onClickField;
  // Filter out all the fields that are children of explicitly collapsed fields.
  // We get fields as a flattened list with the depth indicaing the nesting
  // level, so everything that is deeper than the collapsed field (child) will
  // be filtered out as a child until we run into another element with the same
  // depth (a sibling)
  const fields = useMemo(() => {
    return getVisibleFields(allFields);
  }, [allFields]);

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
