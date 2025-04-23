import { ReactFlowProps } from '@xyflow/react';

import { Edge } from '@/types/edge';
import { Node } from '@/types/node';

type BaseProps = Pick<ReactFlowProps, 'title' | 'onConnect' | 'onPaneClick'>;

export interface DiagramProps extends BaseProps {
  isDarkMode?: boolean;
  nodes: Array<Node>;
  edges: Array<Edge>;
}
