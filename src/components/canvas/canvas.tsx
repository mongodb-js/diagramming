import '@xyflow/react/dist/style.css';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { ReactFlow, Background, ProOptions, ReactFlowProps, useNodesState } from '@xyflow/react';

import { MiniMap } from '@/components/controls/mini-map';
import { Controls } from '@/components/controls/controls';
import { Node as ExternalNode } from '@/types';
import { Node } from '@/components/node/node';
import { useCanvas } from '@/components/canvas/use-canvas';
import { InternalNode } from '@/types/internal';

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

type Props = Pick<ReactFlowProps, 'title'> & { nodes: ExternalNode[] };

export const Canvas = ({ title, nodes: externalNodes }: Props) => {
  const { initialNodes } = useCanvas(externalNodes);

  const [nodes, setNodes, onNodesChange] = useNodesState<InternalNode>(initialNodes);

  useEffect(() => {
    setNodes(initialNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNodes]);

  return (
    <ReactFlowWrapper>
      <ReactFlow
        title={title}
        proOptions={PRO_OPTIONS}
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
      >
        <Background />
        <Controls title={title} />
        <MiniMap />
      </ReactFlow>
    </ReactFlowWrapper>
  );
};
