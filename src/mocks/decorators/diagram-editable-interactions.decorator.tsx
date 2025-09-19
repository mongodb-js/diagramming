import { useCallback, useState, MouseEvent as ReactMouseEvent } from 'react';
import { Decorator } from '@storybook/react';

import { DiagramProps, FieldId, NodeProps } from '@/types';

function stringArrayCompare(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  if (a === b) return true;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function newField() {
  return {
    name: `new-field-${Math.floor(Math.random() * 100_000)}`,
    type: 'string',
  };
}

export const DiagramEditableInteractionsDecorator: Decorator<DiagramProps> = (Story, context) => {
  const [nodes, setNodes] = useState<NodeProps[]>(context.args.nodes);

  const onFieldClick = useCallback(
    (
      event: ReactMouseEvent,
      params: {
        nodeId: string;
        id: FieldId;
      },
    ) => {
      setNodes(nodes =>
        nodes.map(node => ({
          ...node,
          fields: node.fields.map(field => ({
            ...field,
            selected:
              params.nodeId === node.id &&
              !!field.id &&
              typeof field.id !== 'string' &&
              typeof params.id !== 'string' &&
              stringArrayCompare(params.id, field.id),
          })),
        })),
      );
    },
    [],
  );

  const onAddFieldToNodeClick = useCallback((event: ReactMouseEvent, nodeId: string) => {
    setNodes(nodes =>
      nodes.map(node =>
        node.id !== nodeId
          ? node
          : {
              ...node,
              fields: [...node.fields, newField()],
            },
      ),
    );
  }, []);

  return Story({
    ...context,
    args: {
      ...context.args,
      nodes,
      onFieldClick,
      onAddFieldToNodeClick,
    },
  });
};
