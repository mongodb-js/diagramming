import { useState } from 'react';
import { Connection } from '@xyflow/react';
import { Decorator } from '@storybook/react';

import { DiagramProps, EdgeProps } from '@/types';
import { EMPLOYEES_TO_ORDERS_EDGE } from '@/mocks/datasets/edges';

export const DiagramConnectableDecorator: Decorator<DiagramProps> = (Story, context) => {
  const [edges, setEdges] = useState<EdgeProps[]>(context.args.edges);
  const onConnect = (connection: Connection) => {
    setEdges([
      ...edges.filter(edge => edge.source === connection.source && edge.source === connection.target),
      {
        ...EMPLOYEES_TO_ORDERS_EDGE,
        source: connection.source,
        target: connection.target,
        animated: true,
        selected: true,
      },
    ]);
  };

  const onPaneClick = () => {
    setEdges(edges.filter(edge => edge.id !== EMPLOYEES_TO_ORDERS_EDGE.id));
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
};
