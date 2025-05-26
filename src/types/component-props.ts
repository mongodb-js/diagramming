import { ReactFlowProps } from '@xyflow/react';

import { EdgeProps } from '@/types/edge';
import { NodeProps } from '@/types/node';
import { InternalEdge, InternalNode } from '@/types/internal';

type BaseProps = Pick<
  ReactFlowProps<InternalNode, InternalEdge>,
  | 'title'
  | 'id'
  | 'className'
  | 'onConnect'
  | 'onPaneClick'
  | 'onEdgeClick'
  | 'onNodeContextMenu'
  | 'onSelectionContextMenu'
  | 'onSelectionChange'
  | 'onSelectionDragStop'
  | 'onNodeDrag'
  | 'onNodeDragStop'
  | 'onConnectStart'
  | 'panOnDrag'
  | 'fitViewOptions'
  | 'selectionKeyCode'
  | 'multiSelectionKeyCode'
  | 'zoomOnPinch'
  | 'zoomOnScroll'
  | 'maxZoom'
  | 'minZoom'
>;

export interface DiagramProps extends BaseProps {
  isDarkMode?: boolean;
  nodes: Array<NodeProps>;
  edges: Array<EdgeProps>;
}
