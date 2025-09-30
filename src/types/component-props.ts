import { Connection, FitViewOptions, HandleType } from '@xyflow/react';
import { MouseEvent as ReactMouseEvent } from 'react';

import { EdgeProps } from '@/types/edge';
import { NodeProps, FieldId } from '@/types/node';

/**
 * Called when a new connection is made between two nodes.
 */
export type OnConnectHandler = (connection: Connection) => void;

/**
 * Called when a selectable field is clicked.
 */
export type OnFieldClickHandler = (
  event: ReactMouseEvent,
  params: {
    id: FieldId;
    nodeId: string;
  },
) => void;

/**
 * Called when the button to add a new field is clicked on a node.
 */
export type OnAddFieldToNodeClickHandler = (event: ReactMouseEvent, nodeId: string) => void;

/**
 * Called when the button to add a new field is clicked on an object type field in a node.
 */
export type OnAddFieldToObjectFieldClickHandler = (event: ReactMouseEvent, nodeId: string, fieldPath: string[]) => void;

/**
 * Called when a field's name is edited.
 */
export type OnFieldNameChangeHandler = (nodeId: string, fieldPath: string[], newName: string) => void;

/**
 * Called when the canvas (pane) is clicked.
 */
export type OnPaneClickHandler = (event: ReactMouseEvent) => void;

/**
 * Called when an edge is clicked.
 */
export type OnEdgeClickHandler = (event: ReactMouseEvent, edge: EdgeProps) => void;

/**
 * Called when a node is clicked.
 */
export type OnNodeClickHandler = (event: ReactMouseEvent, edge: NodeProps) => void;

/**
 * Called when a node is right-clicked.
 */
export type OnNodeContextMenuHandler = (event: ReactMouseEvent, node: NodeProps) => void;

/**
 * Called when multiple elements are right-clicked (e.g., via multi-selection).
 */
export type OnSelectionContextMenuHandler = (event: ReactMouseEvent, nodes: NodeProps[]) => void;

/**
 * Called when the selection of elements (nodes and edges) changes.
 */
export type OnSelectionChangeHandler = (params: { nodes: NodeProps[]; edges: EdgeProps[] }) => void;

/**
 * Called when dragging of selected elements ends.
 */
export type OnSelectionDragStopHandler = (event: ReactMouseEvent, nodes: NodeProps[]) => void;

/**
 * Called when a node is dragged.
 */
export type OnNodeDragHandler = (event: ReactMouseEvent, node: NodeProps, nodes: NodeProps[]) => void;

/**
 * Called when a node finishes being dragged.
 */
export type OnNodeDragStopHandler = (event: ReactMouseEvent, node: NodeProps, nodes: NodeProps[]) => void;

/**
 * Called when a new connection is started from a node handle.
 */
export type OnConnectStartHandler = (
  event: MouseEvent | TouchEvent,
  params: { nodeId?: string | null; handleType: HandleType | null; handleId?: string | null },
) => void;

export interface DiagramProps {
  /**
   * Unique identifier for the diagram instance.
   */
  id?: string;

  /**
   * Title used for the diagram, displayed next to the controls.
   */
  title?: string;

  /**
   * Whether the diagram should render in dark mode.
   */
  isDarkMode?: boolean;

  /**
   * Nodes to render in the diagram.
   */
  nodes: NodeProps[];

  /**
   * Edges to render in the diagram.
   */
  edges: EdgeProps[];

  /**
   * Optional CSS class to apply to the React Flow container.
   */
  className?: string;

  /**
   * Callback when a new connection is made between nodes.
   */
  onConnect?: OnConnectHandler;

  /**
   * Callback when the user clicks on the empty canvas.
   */
  onPaneClick?: OnPaneClickHandler;

  /**
   * Callback when the user clicks on an edge.
   */
  onEdgeClick?: OnEdgeClickHandler;

  /**
   * Callback when the user clicks on a node.
   */
  onNodeClick?: OnNodeClickHandler;

  /**
   * Callback when the user right-clicks on a node.
   */
  onNodeContextMenu?: OnNodeContextMenuHandler;

  /**
   * Callback when the user right-clicks with multiple elements selected.
   */
  onSelectionContextMenu?: OnSelectionContextMenuHandler;

  /**
   * Callback when the selection of nodes or edges changes.
   */
  onSelectionChange?: OnSelectionChangeHandler;

  /**
   * Callback when dragging a selected group of elements ends.
   */
  onSelectionDragStop?: OnSelectionDragStopHandler;

  /**
   * Callback when a node is dragged.
   */
  onNodeDrag?: OnNodeDragHandler;

  /**
   * Callback when a node finishes being dragged.
   */
  onNodeDragStop?: OnNodeDragStopHandler;

  /**
   * Callback when a new connection starts (e.g. user begins dragging from a handle).
   */
  onConnectStart?: OnConnectStartHandler;

  /**
   * Callback when the user clicks on a selectable field.
   */
  onFieldClick?: OnFieldClickHandler;

  /**
   * Callback when the user clicks the button to add a new field to a node.
   */
  onAddFieldToNodeClick?: OnAddFieldToNodeClickHandler;

  /**
   * Callback when the user clicks to add a new field to an object type field in a node.
   */
  onAddFieldToObjectFieldClick?: OnAddFieldToObjectFieldClickHandler;

  /**
   * Callback when a field's name is changed.
   */
  onFieldNameChange?: OnFieldNameChangeHandler;

  /**
   * Whether the diagram should pan when dragging elements.
   */
  panOnDrag?: boolean | number[];

  /**
   * Options to control how `fitView` behaves.
   */
  fitViewOptions?: FitViewOptions;

  /**
   * Key code used to trigger selection mode.
   */
  selectionKeyCode?: string | null;

  /**
   * Key code used to enable multi-selection mode.
   */
  multiSelectionKeyCode?: string[];

  /**
   * Whether to allow zooming via pinch gestures.
   */
  zoomOnPinch?: boolean;

  /**
   * Whether to allow zooming via scroll.
   */
  zoomOnScroll?: boolean;

  /**
   * Maximum allowed zoom level.
   */
  maxZoom?: number;

  /**
   * Minimum allowed zoom level.
   */
  minZoom?: number;

  /**
   * Whether to only render elements that are currently visible in the viewport.
   * This can improve performance for large diagrams.
   * @default true
   */
  onlyRenderVisibleElements?: boolean;

  /**
   * With a threshold greater than zero you can delay node drag events. If
   * threshold equals 1, you need to drag the node 1 pixel before a drag event
   * is fired. 1 is the default value, so that clicks don’t trigger drag events.
   * @default 1
   */
  nodeDragThreshold?: number;
}
