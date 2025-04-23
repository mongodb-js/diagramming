import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Connection } from '@xyflow/react';

import { Diagram } from '@/components/diagram';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { EMPLOYEES_TO_EMPLOYEES_EDGE, ORDERS_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';
import { Edge } from '@/types';

const diagram: Meta<typeof Diagram> = {
  title: 'Diagram',
  component: Diagram,
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [ORDERS_TO_EMPLOYEES_EDGE, EMPLOYEES_TO_EMPLOYEES_EDGE],
    nodes: [ORDERS_NODE, EMPLOYEES_NODE],
  },
};

export default diagram;
type Story = StoryObj<typeof Diagram>;
export const BasicDiagram: Story = {};
export const DiagramWithConnectableNodes: Story = {
  decorators: [
    (Story, context) => {
      const [edges, setEdges] = useState<Edge[]>(context.args.edges);
      const onConnect = (connection: Connection) => {
        setEdges([
          ...edges,
          {
            ...ORDERS_TO_EMPLOYEES_EDGE,
            source: connection.source,
            target: connection.target,
            animated: true,
            selected: true,
          },
        ]);
      };

      const onPaneClick = () => {
        setEdges(edges.filter(edge => edge.id !== ORDERS_TO_EMPLOYEES_EDGE.id));
      };

      return Story({
        ...context,
        args: {
          ...context.args,
          edges,
          onPaneClick,
          onConnect,
        },
      });
    },
  ],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [ORDERS_NODE, EMPLOYEES_NODE],
  },
};
