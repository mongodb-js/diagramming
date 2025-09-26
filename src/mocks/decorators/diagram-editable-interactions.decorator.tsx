import { useCallback, useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import { Decorator } from '@storybook/react';

import { DiagramProps, NodeField, NodeProps } from '@/types';
import { stringArrayCompare } from '@/utilities/string-array-compare';

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
  const [selectedFields, setSelectedFields] = useState<{ nodeId: string; fieldId: string[] }[]>([]);
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
        id: string[];
      },
    ) => {
      setSelectedFields([
        {
          nodeId: params.nodeId,
          fieldId: params.id,
        },
      ]);
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

  return { nodes, selectedFields, onFieldClick, onAddFieldToNodeClick, onAddFieldToObjectFieldClick };
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
