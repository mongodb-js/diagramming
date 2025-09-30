import { useEffect, useState } from 'react';
import { Decorator } from '@storybook/react';

import { DiagramProps, EdgeProps, NodeProps } from '@/types';
import { applyLayout } from '@/utilities/apply-layout';

const names = [
  'users',
  'logs',
  'orders_2025_q3',
  'product_inventory',
  'customer_feedback_surveys',
  'internal_metrics_weekly_rollup',
  'application_event_stream_error_logs_high_priority',
  'enterprise_tenant_billing_transactions_us_east_1',
  'enterprise_user_authentication_logs_2025_q3_us_east_1_region_backup',
  'api_keys',
];

const types = ['string', 'number', 'boolean', 'date', 'object', 'array'];

let previousWasObject = false;
let previousDepth = 0;
function getRandomTypeAndDepth(i: number) {
  if (i === 0) {
    previousWasObject = false;
    previousDepth = 0;
  }
  const type = types[Math.floor(Math.random() * types.length)];

  const depth = previousWasObject
    ? Math.random() > 0.25
      ? previousDepth + 1
      : previousDepth
    : previousDepth > 0 && Math.random() > 0.2
      ? previousDepth
      : 0;

  previousWasObject = type === 'object';

  previousDepth = depth || 0;

  return {
    type,
    depth,
  };
}

const generateNodes = (count: number): NodeProps[] => {
  return Array.from(Array(count).keys()).map((nodeIndex: number) => ({
    id: `node_${nodeIndex}`,
    type: 'table',
    position: {
      x: 0,
      y: 0,
    },
    title: names[Math.floor(Math.random() * names.length)],
    fields: Array.from(Array(1 + (nodeIndex % 9)).keys()).map((fieldIndex: number) => ({
      name: `${names[Math.floor(Math.random() * names.length)]}-${fieldIndex}`,
      ...getRandomTypeAndDepth(fieldIndex),
    })),
  }));
};

export const useStressTestNodesAndEdges = (nodeCount: number) => {
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const [edges, setEdges] = useState<EdgeProps[]>([]);

  useEffect(() => {
    const newNodes = generateNodes(nodeCount);
    const newEdges: EdgeProps[] = newNodes.map(node => ({
      id: `edge_${node.id}`,
      source: newNodes[Math.floor(Math.random() * newNodes.length)].id,
      target: newNodes[Math.floor(Math.random() * newNodes.length)].id,
      markerStart: 'many',
      markerEnd: 'one',
    }));

    let applyUpdate = true;
    applyLayout<NodeProps, EdgeProps>(newNodes, newEdges, 'STAR').then(result => {
      if (!applyUpdate) return;
      setNodes(result.nodes);
      setEdges(result.edges);
    });
    return () => {
      applyUpdate = false;
    };
  }, [nodeCount]);

  return { nodes, edges };
};

export const DiagramStressTestDecorator: Decorator<DiagramProps> = (Story, context) => {
  const { nodes, edges } = useStressTestNodesAndEdges(100);

  return Story({
    ...context,
    args: {
      ...context.args,
      nodes,
      edges,
    },
  });
};
