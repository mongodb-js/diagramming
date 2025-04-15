import '@xyflow/react/dist/style.css';
import styled from '@emotion/styled';
import { Background, ProOptions, ReactFlow, ReactFlowProps, useEdgesState, useNodesState } from '@xyflow/react';

import { MiniMap } from '@/components/controls/mini-map';
import { Controls } from '@/components/controls/controls';
import { Edge, Node as ExternalNode } from '@/types';
import { Node } from '@/components/node/node';
import { useCanvas } from '@/components/canvas/use-canvas';
import { InternalNode } from '@/types/internal';
import { FloatingEdge } from '@/components/edge/floating-edge';
import { SelfReferencingEdge } from '@/components/edge/self-referencing-edge';

const MAX_ZOOM = 3;
const MIN_ZOOM = 0.1;

const PRO_OPTIONS: ProOptions = {
  hideAttribution: true,
};

const ReactFlowWrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.background};
`;

const nodeTypes = {
  table: Node,
  collection: Node,
  connectable: Node,
};

const edgeTypes = {
  floatingEdge: FloatingEdge,
  selfReferencingEdge: SelfReferencingEdge,
};

type Props = Pick<ReactFlowProps, 'title'> & { nodes: ExternalNode[]; edges: Edge[] };

export const Canvas = ({ title, nodes: externalNodes, edges: externalEdges }: Props) => {
  const { initialNodes, initialEdges } = useCanvas(externalNodes, externalEdges);

  const [nodes, , onNodesChange] = useNodesState<InternalNode>(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState<Edge>(initialEdges);

  return (
    <ReactFlowWrapper>
      <ReactFlow
        title={title}
        proOptions={PRO_OPTIONS}
        maxZoom={MAX_ZOOM}
        minZoom={MIN_ZOOM}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        onlyRenderVisibleElements={true}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls title={title} />
        <MiniMap />
      </ReactFlow>
    </ReactFlowWrapper>
  );
};
