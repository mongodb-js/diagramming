/**
 * Custom marker options for edge start/end.
 */
export type Marker = 'one' | 'many' | 'oneOrMany';

export interface EdgeProps {
  /**
   * Unique identifier for the edge.
   */
  id: string;

  /**
   * The ID of the source node this edge originates from.
   */
  source: string;

  /**
   * The ID of the target node this edge points to.
   */
  target: string;

  /**
   * Index of the field in the source node this edge connects from (if applicable).
   */
  sourceFieldIndex?: number;

  /**
   * Index of the field in the target node this edge connects to (if applicable).
   */
  targetFieldIndex?: number;

  /**
   * Whether the edge should be hidden from view.
   */
  hidden?: boolean;

  /**
   * Whether the edge is currently selected.
   */
  selected?: boolean;

  /**
   * Whether the edge should be animated (e.g. a flowing line).
   */
  animated?: boolean;

  /**
   * Marker to display at the start of the edge.
   */
  markerStart: Marker;

  /**
   * Marker to display at the end of the edge.
   */
  markerEnd: Marker;
}
