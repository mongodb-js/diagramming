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

export const DiagramStressTestDecorator: Decorator<DiagramProps> = (Story, context) => {
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const [edges, setEdges] = useState<EdgeProps[]>([]);

  useEffect(() => {
    const nodes = generateNodes(100);
    const edges = generateEdges(nodes);

    applyLayout<NodeProps, EdgeProps>(nodes, edges, 'STAR').then(result => {
      setNodes(result.nodes);
      setEdges(result.edges);
    });
  }, []);

  const generateEdges = (nodes: NodeProps[]): EdgeProps[] => {
    return nodes.map(node => ({
      id: `edge_${node.id}`,
      source: nodes[Math.floor(Math.random() * nodes.length)].id,
      target: nodes[Math.floor(Math.random() * nodes.length)].id,
      markerStart: 'many',
      markerEnd: 'one',
    }));
  };

  const generateNodes = (count: number): NodeProps[] => {
    return Array.from(Array(count).keys()).map(i => ({
      id: `node_${i}`,
      type: 'table',
      position: {
        x: 0,
        y: 0,
      },
      title: names[Math.floor(Math.random() * names.length)],
      fields: Array.from(Array(1 + (i % 9)).keys()).map(_ => ({
        name: names[Math.floor(Math.random() * names.length)],
        type: 'varchar',
      })),
    }));
  };

  return Story({
    ...context,
    args: {
      ...context.args,
      nodes,
      edges,
    },
  });
};
