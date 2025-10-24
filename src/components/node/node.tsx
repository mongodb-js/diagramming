import { Handle, NodeProps, Position, useStore, useViewport } from '@xyflow/react';
import styled from '@emotion/styled';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';
import { useTheme } from '@emotion/react';
import Icon from '@leafygreen-ui/icon';
import { useCallback, useState } from 'react';

import {
  DEFAULT_NODE_HEADER_HORIZONTAL_PADDING,
  DEFAULT_NODE_HEADER_ICON_HORIZONTAL_PADDING,
  DEFAULT_NODE_HEADER_LINE_HEIGHT,
  DEFAULT_NODE_HEADER_VERTICAL_PADDING,
  ZOOM_THRESHOLD,
} from '@/utilities/constants';
import { InternalNode } from '@/types/internal';
import { PlusWithSquare } from '@/components/icons/plus-with-square';
import { ChevronCollapse } from '@/components/icons/chevron-collapse';
import { NodeBorder } from '@/components/node/node-border';
import { FieldList } from '@/components/field/field-list';
import { NodeType } from '@/types';
import { useEditableDiagramInteractions } from '@/hooks/use-editable-diagram-interactions';
import { DiagramIconButton } from '@/components/buttons/diagram-icon-button';

const NodeZoomedOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
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

export const NODE_HEADER_FONT = {
  family: fontFamilies.code,
  size: 13,
  weight: 'bold',
};

const NodeWrapper = styled.div<{ accent: string; color: string; background: string }>`
  position: relative;
  font-family: ${NODE_HEADER_FONT.family};
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
  font-size: ${NODE_HEADER_FONT.size}px;
  line-height: ${DEFAULT_NODE_HEADER_LINE_HEIGHT}px;
  font-weight: ${NODE_HEADER_FONT.weight};
  min-height: ${DEFAULT_NODE_HEADER_LINE_HEIGHT + 2 * DEFAULT_NODE_HEADER_VERTICAL_PADDING}px;
  padding: ${DEFAULT_NODE_HEADER_VERTICAL_PADDING}px ${DEFAULT_NODE_HEADER_HORIZONTAL_PADDING}px;
  background: ${props => props.background};
`;

const NodeHeaderIcon = styled.div`
  display: flex;
  margin: ${DEFAULT_NODE_HEADER_ICON_HORIZONTAL_PADDING}px 0px;
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

const NodeWithFields = styled.div<{ visibility: string }>`
  visibility: ${props => props.visibility};
`;

const TitleControlsContainer = styled.div`
  margin-left: auto;
  margin-right: ${spacing[200]}px;
  display: flex;
  gap: ${spacing[50]}px;
  & > * {
    flex: 0 0 auto;
  }
`;

export const Node = ({
  id,
  type,
  selected,
  isConnectable,
  data: { title, fields, borderVariant, disabled },
}: NodeProps<InternalNode>) => {
  const theme = useTheme();
  const { zoom } = useViewport();

  const [isHovering, setHovering] = useState(false);

  const { onClickAddFieldToNode: addFieldToNodeClickHandler, onNodeExpandToggle } = useEditableDiagramInteractions();

  const onClickAddFieldToNode = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      addFieldToNodeClickHandler?.(event, id);
    },
    [addFieldToNodeClickHandler, id],
  );

  const handleNodeExpandToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onNodeExpandToggle?.(event, id);
    },
    [onNodeExpandToggle, id],
  );

  const getAccent = () => {
    if (disabled && !isHovering) {
      return theme.node.disabledAccent;
    } else if (type === 'table') {
      return theme.node.relationalAccent;
    }
    return theme.node.mongoDBAccent;
  };

  const getBorderVariant = () => {
    if (borderVariant) {
      return borderVariant;
    }
    return selected ? 'selected' : undefined;
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
      <NodeBorder variant={getBorderVariant()}>
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
            <NodeZoomedOut>
              <NodeZoomedOutInner title={title}>{title}</NodeZoomedOutInner>
            </NodeZoomedOut>
          )}
          <NodeWithFields visibility={isContextualZoom ? 'hidden' : 'none'}>
            <NodeHeader background={getHeaderBackground()}>
              <NodeHeaderIcon>
                <Icon fill={theme.node.headerIcon} glyph="Drag" />
              </NodeHeaderIcon>
              <NodeHeaderTitle>{title}</NodeHeaderTitle>
              <TitleControlsContainer>
                {addFieldToNodeClickHandler && (
                  <DiagramIconButton aria-label="Add Field" onClick={onClickAddFieldToNode} title="Add Field">
                    <PlusWithSquare />
                  </DiagramIconButton>
                )}
                {onNodeExpandToggle && (
                  <DiagramIconButton
                    aria-label="Toggle Expand / Collapse Fields"
                    onClick={handleNodeExpandToggle}
                    title="Toggle Expand / Collapse Fields"
                  >
                    <ChevronCollapse />
                  </DiagramIconButton>
                )}
              </TitleControlsContainer>
            </NodeHeader>
            <FieldList nodeId={id} nodeType={type as NodeType} isHovering={isHovering} fields={fields} />
          </NodeWithFields>
        </NodeWrapper>
      </NodeBorder>
    </div>
  );
};
