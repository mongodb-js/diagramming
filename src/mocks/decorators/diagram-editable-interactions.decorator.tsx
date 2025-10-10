import { useCallback, useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
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

function renameField(existingFields: NodeField[], fieldPath: string[], newName: string) {
  const fields = existingFields.map(field => {
    if (JSON.stringify(field.id) !== JSON.stringify(fieldPath)) return field;
    return { ...field, name: newName, id: [...fieldPath.slice(0, -1), newName] };
  });
  return fields;
}

let idAccumulator: string[];
let lastDepth = 0;
// Used to build a string array id based on field depth.
function idFromDepthAccumulator(name: string, depth?: number) {
  if (!depth) {
    idAccumulator = [name];
  } else if (depth > lastDepth) {
    idAccumulator.push(name);
  } else if (depth === lastDepth) {
    idAccumulator[idAccumulator.length - 1] = name;
  } else {
    idAccumulator = idAccumulator.slice(0, depth);
    idAccumulator[depth] = name;
  }
  lastDepth = depth ?? 0;
  return [...idAccumulator];
}
function editableNodesFromNodes(nodes: NodeProps[]): NodeProps[] {
  return nodes.map(node => ({
    ...node,
    type: 'collection',
    fields: node.fields.map(field => ({
      ...field,
      selectable: true,
      id: idFromDepthAccumulator(field.name, field.depth),
    })),
  }));
}

export const useEditableNodes = (initialNodes: NodeProps[]) => {
  const [nodes, setNodes] = useState<NodeProps[]>([]);

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    if (!initialNodes || initialNodes.length === 0) {
      return;
    }

    hasInitialized.current = true;
    setNodes(editableNodesFromNodes(initialNodes));
  }, [initialNodes]);

  const onFieldClick = useCallback(
    (
      event: ReactMouseEvent,
      params: {
        nodeId: string;
        id: FieldId;
      },
    ) => {
      setNodes(nodes =>
        nodes.map(node => {
          let nodeFieldDidChange = false;
          const fields = node.fields.map(field => {
            const selected =
              params.nodeId === node.id &&
              !!field.id &&
              typeof field.id !== 'string' &&
              typeof params.id !== 'string' &&
              stringArrayCompare(params.id, field.id);
            if (field.selected !== selected) {
              nodeFieldDidChange = true;
            }
            return {
              ...field,
              selected,
            };
          });

          if (!nodeFieldDidChange) {
            return node;
          }
          return {
            ...node,
            fields,
          };
        }),
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

  const onFieldNameChange = useCallback((nodeId: string, fieldPath: string[], newName: string) => {
    setNodes(nodes =>
      nodes.map(node =>
        node.id === nodeId
          ? {
              ...node,
              fields: renameField(node.fields, fieldPath, newName),
            }
          : node,
      ),
    );
  }, []);

  return { nodes, onFieldClick, onAddFieldToNodeClick, onAddFieldToObjectFieldClick, onFieldNameChange };
};

export const DiagramEditableInteractionsDecorator: Decorator<DiagramProps> = (Story, context) => {
  const editableArgs = useEditableNodes(context.args.nodes || []);

  return Story({
    ...context,
    args: {
      ...context.args,
      ...editableArgs,
    },
  });
};
