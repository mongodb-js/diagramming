import styled from '@emotion/styled';
import {
  Background,
  ConnectionMode,
  ProOptions,
  ReactFlow,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { MouseEvent, useCallback, useEffect, useMemo } from 'react';

import { MiniMap } from '@/components/controls/mini-map';
import { Controls } from '@/components/controls/controls';
import { DiagramProps } from '@/types';
import { Node } from '@/components/node/node';
import { InternalEdge, InternalNode } from '@/types/internal';
import { FloatingEdge } from '@/components/edge/floating-edge';
import { SelfReferencingEdge } from '@/components/edge/self-referencing-edge';
import { MarkerList } from '@/components/markers/marker-list';
import { ConnectionLine } from '@/components/line/connection-line';
import { convertToExternalNode, convertToExternalNodes, convertToInternalNodes } from '@/utilities/convert-nodes';
import { convertToExternalEdge, convertToExternalEdges, convertToInternalEdges } from '@/utilities/convert-edges';
import { FieldSelectionProvider, SelectedFieldsProvider } from '@/hooks/use-field-selection';

const MAX_ZOOM = 3;
const MIN_ZOOM = 0.1;

const PRO_OPTIONS: ProOptions = {
  hideAttribution: true,
};

const ReactFlowWrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.background};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const nodeTypes = {
  table: Node,
  collection: Node,
};

const edgeTypes = {
  floatingEdge: FloatingEdge,
  selfReferencingEdge: SelfReferencingEdge,
};

export const Canvas = ({
  title,
  nodes: externalNodes,
  edges: externalEdges,
  selectedFields,
  onConnect,
  id,
  onFieldClick,
  onNodeContextMenu,
  onNodeDrag,
  onNodeDragStop,
  onEdgeClick,
  onNodeClick,
  onSelectionDragStop,
  onSelectionContextMenu,
  onSelectionChange,
  ...rest
}: DiagramProps) => {
  const initialNodes = useMemo(() => convertToInternalNodes(externalNodes), [externalNodes]);
  const initialEdges = useMemo(() => convertToInternalEdges(externalEdges), [externalEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState<InternalNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<InternalEdge>(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNodes]);

  useEffect(() => {
    setEdges(initialEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEdges]);

  const _onNodeContextMenu = useCallback(
    (event: MouseEvent, node: InternalNode) => {
      onNodeContextMenu?.(event, convertToExternalNode(node));
    },
    [onNodeContextMenu],
  );

  const _onNodeDrag = useCallback(
    (event: MouseEvent, node: InternalNode, nodes: InternalNode[]) => {
      onNodeDrag?.(event, convertToExternalNode(node), convertToExternalNodes(nodes));
    },
    [onNodeDrag],
  );

  const _onNodeDragStop = useCallback(
    (event: MouseEvent, node: InternalNode, nodes: InternalNode[]) => {
      onNodeDragStop?.(event, convertToExternalNode(node), convertToExternalNodes(nodes));
    },
    [onNodeDragStop],
  );

  const _onSelectionDragStop = useCallback(
    (event: MouseEvent, nodes: InternalNode[]) => {
      onSelectionDragStop?.(event, convertToExternalNodes(nodes));
    },
    [onSelectionDragStop],
  );

  const _onEdgeClick = useCallback(
    (event: MouseEvent, edge: InternalEdge) => {
      onEdgeClick?.(event, convertToExternalEdge(edge));
    },
    [onEdgeClick],
  );

  const _onNodeClick = useCallback(
    (event: MouseEvent, node: InternalNode) => {
      onNodeClick?.(event, convertToExternalNode(node));
    },
    [onNodeClick],
  );

  const _onSelectionContextMenu = useCallback(
    (event: MouseEvent, nodes: InternalNode[]) => {
      onSelectionContextMenu?.(event, convertToExternalNodes(nodes));
    },
    [onSelectionContextMenu],
  );

  const _onSelectionChange = useCallback(
    ({ nodes, edges }: { nodes: InternalNode[]; edges: InternalEdge[] }) => {
      onSelectionChange?.({ nodes: convertToExternalNodes(nodes), edges: convertToExternalEdges(edges) });
    },
    [onSelectionChange],
  );

  return (
    <FieldSelectionProvider onFieldClick={onFieldClick}>
      <SelectedFieldsProvider selectedFields={selectedFields}>
        <ReactFlowWrapper>
          <ReactFlow
            id={id}
            deleteKeyCode={null}
            proOptions={PRO_OPTIONS}
            maxZoom={MAX_ZOOM}
            minZoom={MIN_ZOOM}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodes={nodes}
            onlyRenderVisibleElements={true}
            edges={edges}
            connectionLineComponent={ConnectionLine}
            connectionMode={ConnectionMode.Loose}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            selectionMode={SelectionMode.Partial}
            nodesDraggable={true}
            onConnect={onConnect}
            onNodeContextMenu={_onNodeContextMenu}
            onNodeDrag={_onNodeDrag}
            onNodeDragStop={_onNodeDragStop}
            onSelectionDragStop={_onSelectionDragStop}
            onEdgeClick={_onEdgeClick}
            onNodeClick={_onNodeClick}
            onSelectionContextMenu={_onSelectionContextMenu}
            onSelectionChange={_onSelectionChange}
            {...rest}
          >
            <MarkerList />
            <Background id={id} />
            <Controls title={title} />
            <MiniMap />
          </ReactFlow>
        </ReactFlowWrapper>
      </SelectedFieldsProvider>
    </FieldSelectionProvider>
  );
};
