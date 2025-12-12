import { useReactFlow } from '@xyflow/react';

import { convertToInternalNodes, convertToExternalNode, convertToExternalNodes } from '@/utilities/convert-nodes';
import { InternalEdge, InternalNode } from '@/types/internal';
import { NodeProps, EdgeProps } from '@/types';
import { convertToExternalEdge, convertToInternalEdges } from '@/utilities/convert-edges';

export type DiagramInstance = ReturnType<typeof useDiagram>;
export function useDiagram() {
  const diagram = useReactFlow<InternalNode, InternalEdge>();

  return {
    ...diagram,
    getNode: (id: string) => {
      const node = diagram.getNode(id);
      if (node) {
        return convertToExternalNode(node);
      }
    },
    getNodes: () => {
      const nodes = diagram.getNodes();
      return convertToExternalNodes(nodes);
    },
    addNodes: (payload: NodeProps[]) => {
      const data = convertToInternalNodes(payload);
      diagram.addNodes(data);
    },
    setNodes: (payload: NodeProps[]) => {
      const data = convertToInternalNodes(payload);
      diagram.setNodes(data);
    },
    getEdge: (id: string) => {
      const edge = diagram.getEdge(id);
      if (edge) {
        return convertToExternalEdge(edge);
      }
    },
    getEdges: () => {
      const edges = diagram.getEdges();
      return edges.map(convertToExternalEdge);
    },
    addEdges: (payload: EdgeProps[]) => {
      const data = convertToInternalEdges(payload);
      diagram.addEdges(data);
    },
    setEdges: (payload: EdgeProps[]) => {
      const data = convertToInternalEdges(payload);
      diagram.setEdges(data);
    },
  };
}
