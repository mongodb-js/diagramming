import { Handle, NodeProps, Position, useStore, useViewport } from '@xyflow/react';
import styled from '@emotion/styled';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';
import { useTheme } from '@emotion/react';
import Icon from '@leafygreen-ui/icon';
import { useState } from 'react';

import {
  DEFAULT_FIELD_HEIGHT,
  DEFAULT_FIELD_PADDING,
  DEFAULT_NODE_HEADER_HEIGHT,
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

  min-height: ${props => props.height}px;
`;

const NodeZoomedOutInner = styled.div`
  font-size: 20px;
  text-align: center;
  min-width: 0;
  padding-left: ${spacing[300]}px;
  padding-right: ${spacing[300]}px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const NodeWrapper = styled.div<{ accent: string; color: string; background: string }>`
  position: relative;
  font-family: ${fontFamilies.code};
  background: ${props => props.background};
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
  min-height: ${DEFAULT_NODE_HEADER_HEIGHT}px;
  padding: ${spacing[100]}px ${spacing[400]}px ${spacing[100]}px ${spacing[200]}px;
  background: ${props => props.background};
`;

const NodeHeaderIcon = styled.div`
  display: flex;
  margin-left: ${spacing[100]}px;
  margin-right: ${spacing[100]}px;
`;

export const NodeHeaderTitle = styled.div`
  overflow-wrap: break-word;
  min-width: 0;
`;

const NodeHandle = styled(Handle)<{ ['z-index']?: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0;
  transform: none;
  opacity: 0;
  z-index: ${props => props['z-index']};
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

  const getNodeBackground = () => {
    if (isHovering) {
      return theme.node.backgroundHover;
    } else {
      return theme.node.background;
    }
  };

  const getNodeHeight = () => {
    const fieldHeight = fields.length * DEFAULT_FIELD_HEIGHT + DEFAULT_FIELD_PADDING * 2;
    const titleHeight = (title.length / 15) * DEFAULT_FIELD_HEIGHT;
    return fieldHeight + titleHeight;
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
    <div title={title} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <NodeBorder variant={selected ? 'selected' : borderVariant}>
        <NodeHandle
          id="source"
          position={Position.Right}
          type="source"
          isConnectable={isConnectable ?? false}
          z-index={fromHandle ? 0 : 1}
        />
        <NodeHandle
          id="target"
          position={Position.Left}
          type="target"
          isConnectable={isConnectable ?? false}
          z-index={fromHandle ? 1 : 0}
        />
        <NodeWrapper accent={getAccent()} color={getNodeColor()} background={getNodeBackground()}>
          {isContextualZoom && (
            <NodeZoomedOut height={getNodeHeight()}>
              <NodeZoomedOutInner title={title}>{title}</NodeZoomedOutInner>
            </NodeZoomedOut>
          )}
          {!isContextualZoom && (
            <>
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
              <FieldList nodeType={type as NodeType} isHovering={isHovering} fields={fields} />
            </>
          )}
        </NodeWrapper>
      </NodeBorder>
    </div>
  );
};
