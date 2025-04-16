import { Handle, NodeProps, Position, useViewport } from '@xyflow/react';
import styled from '@emotion/styled';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';
import { useTheme } from '@emotion/react';
import Icon from '@leafygreen-ui/icon';

import { ellipsisTruncation } from '@/styles/styles';
import {
  DEFAULT_FIELD_HEIGHT,
  DEFAULT_FIELD_PADDING,
  DEFAULT_NODE_HEADER_HEIGHT,
  DEFAULT_NODE_WIDTH,
  ZOOM_THRESHOLD,
} from '@/utilities/constants';
import { InternalNode } from '@/types/internal';
import { NodeBorder } from '@/components/node/node-border';
import { FieldList } from '@/components/field/field-list';

const NodeZoomedOut = styled.div<{ height: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height}px;
`;

const NodeZoomedOutInner = styled.div`
  font-size: 20px;
  text-align: center;
  ${ellipsisTruncation}
`;

const NodeWrapper = styled.div<{ accent: string }>`
  position: relative;
  font-family: ${fontFamilies.code};
  background: ${props => props.theme.node.background};
  color: ${props => props.theme.node.color};
  width: ${DEFAULT_NODE_WIDTH}px;
  overflow: hidden;
  border-left: 1px solid ${props => props.accent};
  border: 1px solid ${props => props.theme.node.border};
  border-radius: ${spacing[200]}px;

  &:hover {
    background: ${props => props.theme.node.backgroundHover};
  }

  &::before {
    position: absolute;
    display: block;
    content: ' ';
    height: 100%;
    background: ${props => props.accent};
    width: 2px;
  }
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 20px;
  font-weight: bold;
  height: ${DEFAULT_NODE_HEADER_HEIGHT}px;
  padding: ${spacing[100]}px ${spacing[400]}px ${spacing[100]}px ${spacing[200]}px;
  background: ${props => props.theme.node.backgroundHeader};
  ${ellipsisTruncation};
`;

const NodeHeaderIcon = styled.div`
  display: flex;
  flex: 0 0 ${spacing[400]}px;
  margin-left: ${spacing[100]}px;
`;

const NodeHeaderTitle = styled.div`
  ${ellipsisTruncation}
`;

const NodeHandle = styled(Handle)`
  visibility: hidden;
`;

export const Node = ({ type, selected, data: { title, fields, borderVariant } }: NodeProps<InternalNode>) => {
  const theme = useTheme();
  const { zoom } = useViewport();

  const getAccent = () => {
    if (type === 'table') {
      return theme.node.relationalAccent;
    }
    return theme.node.mongoDBAccent;
  };

  const isContextualZoom = zoom < ZOOM_THRESHOLD;

  return (
    <NodeBorder variant={selected ? 'selected' : borderVariant}>
      <NodeHandle id="source" position={Position.Right} type="source" />
      <NodeHandle id="source" position={Position.Left} type="target" />
      <NodeWrapper accent={getAccent()}>
        <NodeHeader>
          {!isContextualZoom && (
            <>
              <NodeHeaderIcon>
                <Icon fill={theme.node.headerIcon} glyph="Drag" />
              </NodeHeaderIcon>
              <NodeHeaderTitle>{title}</NodeHeaderTitle>
            </>
          )}
        </NodeHeader>
        {isContextualZoom && (
          <NodeZoomedOut height={fields.length * DEFAULT_FIELD_HEIGHT + DEFAULT_FIELD_PADDING * 2}>
            <NodeZoomedOutInner title={title}>{title}</NodeZoomedOutInner>
          </NodeZoomedOut>
        )}
        {!isContextualZoom && <FieldList accent={getAccent()} fields={fields} />}
      </NodeWrapper>
    </NodeBorder>
  );
};
