import '@xyflow/react/dist/style.css';
import styled from '@emotion/styled';
import { MiniMap } from '@/components/controls/mini-map';
import { Controls } from '@/components/controls/controls';
import { useEffect, useMemo } from 'react';
import { InternalNode, Node as ExternalNode } from '@/types';
import { Node } from '@/components/node/node';
import { ReactFlow, Background, ProOptions, ReactFlowProps, useNodesState } from '@xyflow/react';

const PRO_OPTIONS: ProOptions = {
  hideAttribution: true,
};

const ReactFlowWrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.background};
`;

const nodeTypes = {
  TABLE: Node,
  COLLECTION: Node,
};

type Props = Pick<ReactFlowProps, 'title'> & { nodes: ExternalNode[] };

export const Canvas = ({ title, nodes: externalNodes }: Props) => {
  const initialNodes: InternalNode[] = useMemo(
    () =>
      externalNodes.map(node => {
        const { title, fields, borderVariant, ...rest } = node;
        return {
          ...rest,
          data: {
            title,
            fields,
            borderVariant,
          },
        };
      }),
    [externalNodes],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<InternalNode>(initialNodes);

  useEffect(() => {
    setNodes(initialNodes);
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
