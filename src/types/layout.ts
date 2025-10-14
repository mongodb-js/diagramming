import { Measured, Position } from '@/types/node';

/**
 * Defines the available layout directions for a diagram.
 */
export type LayoutDirection = 'LEFT_RIGHT' | 'TOP_BOTTOM' | 'STAR' | 'RECTANGLE';

/**
 * A minimal representation of a node used during layout calculation.
 */
export interface BaseNode {
  /**
   * Unique identifier for the node.
   */
  id: string;

  /**
   * Current position of the node in the diagram.
   */
  position: Position;

  /**
   * The width and height of the node.
   */
  measured?: Measured;
}

/**
 * A minimal representation of an edge used during layout calculation.
 */
export interface BaseEdge {
  /**
   * Unique identifier for the edge.
   */
  id: string;

  /**
   * ID of the source node this edge originates from.
   */
  source: string;

  /**
   * ID of the target node this edge points to.
   */
  target: string;
}

/**
 * Generic structure representing the output of a layout algorithm.
 */
export interface ApplyLayout<N, E> {
  /**
   * Nodes with updated positions.
   */
  nodes: N[];

  /**
   * Edges to be retained after layout is applied.
   */
  edges: E[];
}
