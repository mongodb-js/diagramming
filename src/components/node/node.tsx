import { Handle, NodeProps, Position, useStore, useViewport } from '@xyflow/react';
import styled from '@emotion/styled';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';
import { useTheme } from '@emotion/react';
import Icon from '@leafygreen-ui/icon';
import { useState } from 'react';

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
import { NodeType } from '@/types';

const NodeZoomedOut = styled.div<{ height: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height}px;
`;

const NodeZoomedOutInner = styled.div`
  font-size: 20px;
  text-align: center;
  padding-left: ${spacing[300]}px;
  padding-right: ${spacing[300]}px;
  ${ellipsisTruncation}
`;

const NodeWrapper = styled.div<{ accent: string; color: string }>`
  position: relative;
  font-family: ${fontFamilies.code};
  background: ${props => props.theme.node.background};
  color: ${props => props.color};
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

const NodeHeader = styled.div<{ background?: string }>`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 20px;
  font-weight: bold;
  height: ${DEFAULT_NODE_HEADER_HEIGHT}px;
  padding: ${spacing[100]}px ${spacing[400]}px ${spacing[100]}px ${spacing[200]}px;
  background: ${props => props.background};
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

const NodeHandle = styled(Handle)<{ zIndex?: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0;
  transform: none;
  opacity: 0;
  z-index: ${props => props.zIndex};
`;

export const Node = ({
  type,
  selected,
  isConnectable,
  data: { title, fields, borderVariant, disabled },
}: NodeProps<InternalNode>) => {
  const theme = useTheme();
  const { zoom } = useViewport();

  const [isHovering, setHovering] = useState(false);

  const getAccent = () => {
    if (disabled && !isHovering) {
      return theme.node.disabledAccent;
    } else if (type === 'table') {
      return theme.node.relationalAccent;
    }
    return theme.node.mongoDBAccent;
  };

  const getHeaderBackground = () => {
    if (disabled && !isHovering) {
      return theme.node.disabledHeader;
    } else {
      return theme.node.backgroundHeader;
    }
  };

  const getNodeColor = () => {
    if (disabled && !isHovering) {
      return theme.node.disabledColor;
    } else {
      return theme.node.color;
    }
  };

  const isContextualZoom = zoom < ZOOM_THRESHOLD;

  const fromHandle = useStore(state => state.connection.fromHandle);

  const onMouseEnter = () => {
    setHovering(true);
  };

  const onMouseLeave = () => {
    setHovering(false);
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <NodeBorder variant={selected ? 'selected' : borderVariant}>
        <NodeHandle
          id="source"
          isConnectable={isConnectable}
          position={Position.Right}
          type="source"
          zIndex={fromHandle ? 0 : 1}
        />
        <NodeHandle
          id="target"
          isConnectable={isConnectable}
          position={Position.Left}
          type="target"
          zIndex={fromHandle ? 1 : 0}
        />
        <NodeWrapper accent={getAccent()} color={getNodeColor()}>
          <NodeHeader background={getHeaderBackground()}>
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
          {!isContextualZoom && <FieldList nodeType={type as NodeType} isHovering={isHovering} fields={fields} />}
        </NodeWrapper>
      </NodeBorder>
    </div>
  );
};
