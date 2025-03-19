import ReactFlow, { Background, ProOptions, ReactFlowProps } from 'reactflow';
import 'reactflow/dist/style.css';
import styled from '@emotion/styled';
import { MiniMap } from '@/components/controls/mini-map';
import { Controls } from '@/components/controls/controls';

const PRO_OPTIONS: ProOptions = {
  hideAttribution: true,
};

const ReactFlowWrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.background};
`;

type Props = Pick<ReactFlowProps, 'title'>;

export const Canvas = ({ title }: Props) => {
  return (
    <ReactFlowWrapper>
      <ReactFlow title={title} proOptions={PRO_OPTIONS}>
        <Background />
        <Controls title={title} />
        <MiniMap />
      </ReactFlow>
    </ReactFlowWrapper>
  );
};
