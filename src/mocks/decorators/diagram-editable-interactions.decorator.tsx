import { useCallback, useState, MouseEvent as ReactMouseEvent } from 'react';
import { Decorator } from '@storybook/react';

import { DiagramProps, FieldId, NodeField, NodeProps } from '@/types';

function stringArrayCompare(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  if (a === b) return true;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const newField = (parentFieldPath?: string[]) => {
  const name = `newField${Math.floor(Math.random() * 100_000)}`;

  return {
    name,
    type: 'string',
    selectable: true,
    depth: parentFieldPath ? parentFieldPath.length : 0,
    id: parentFieldPath ? [...parentFieldPath, name] : [name],
  };
};

function addFieldToNode(existingFields: NodeField[], parentFieldPath: string[]) {
  if (parentFieldPath.length === 0) {
    return [...existingFields, newField()];
  }

  const fields = [...existingFields];

  const indexToAddFieldTo = fields.findIndex((field: NodeField) => {
    if (typeof field.id !== 'object') {
      throw new Error('Invalid field to add to');
    }

    return stringArrayCompare(field.id, parentFieldPath);
  });

  if (indexToAddFieldTo === -1) {
    throw new Error('Field to add to not found');
  }

  fields.splice(indexToAddFieldTo + 1, 0, newField(parentFieldPath));

  return fields;
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

  const onAddFieldToObjectFieldClick = useCallback(
    (event: ReactMouseEvent, nodeId: string, parentFieldPath: string[]) => {
      setNodes(nodes =>
        nodes.map(node =>
          node.id === nodeId
            ? {
                ...node,
                fields: addFieldToNode(node.fields, parentFieldPath),
              }
            : node,
        ),
      );
    },
    [],
  );

  return Story({
    ...context,
    args: {
      ...context.args,
      nodes,
      onFieldClick,
      onAddFieldToNodeClick,
      onAddFieldToObjectFieldClick,
    },
  });
};
