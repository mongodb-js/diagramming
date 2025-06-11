/**
 * Represents the type of node in the diagram.
 */
export type NodeType = 'table' | 'collection';

/**
 * Variants for the visual styling of a node's border.
 */
export type NodeBorderVariant = 'subtle' | 'preview' | 'selected' | 'none';

/**
 * Variants for how a field within a node is styled.
 */
export type NodeFieldVariant = 'disabled' | 'preview' | 'primary' | 'default';

/**
 * Variants for how a field responds to hover interactions.
 */
export type NodeFieldHoverVariant = 'none' | 'default';

/**
 * Glyphs used to represent metadata on fields, such as keys or relationships.
 */
export type NodeGlyph = 'key' | 'link';

/**
 * Represents an (x, y) coordinates.
 */
export interface Position {
  /**
   * Horizontal position in pixels.
   */
  x: number;

  /**
   * Vertical position in pixels.
   */
  y: number;
}

/**
 * Optional width and height measurements.
 */
export interface Measured {
  /**
   * Width in pixels.
   */
  width?: number;

  /**
   * Height in pixels.
   */
  height?: number;
}

export interface NodeProps {
  /**
   * Unique identifier for the node.
   */
  id: string;

  /**
   * The title of the node, usually a collection or table name.
   */
  title: string;
  /**
   * Whether the node is disabled.
   */
  disabled?: boolean;

  /**
   * A list of fields in a node.
   */
  fields: NodeField[];

  /**
   * The variant (color and style) or the node border.
   */
  borderVariant?: NodeBorderVariant;

  /**
   * The type of the node, either representing a collection or table.
   */
  type: NodeType;

  /**
   * Position of the node on the canvas.
   */
  position: Position;

  /**
   * The width and height of the node. If not provided, the node will calculate its own width and height.
   */
  measured?: Measured;

  /**
   * Whether the node should be hidden from the canvas.
   */
  hidden?: boolean;

  /**
   * Whether the node is draggable by the user.
   */
  draggable?: boolean;

  /**
   * Whether an edge can be created between this node and another.
   */
  connectable?: boolean;

  /**
   * Indicates if the node is currently selected.
   */
  selected?: boolean;

  /**
   * Indicates if the node is selectable.
   */
  selectable?: boolean;

  /**
   * Optional inline styles to apply to the node.
   */
  style?: React.CSSProperties;

  /**
   * Optional CSS class name for the node.
   */
  className?: string;
}

export interface NodeField {
  /**
   * The name of the field.
   */
  name: string;

  /**
   * The type of the field, for example "objectId".
   */
  type?: string;

  /**
   * The depth of the field.
   */
  depth?: number;

  /**
   * A list of glyphs which are shown next to a field.
   */
  glyphs?: NodeGlyph[];

  /**
   * The size of glyphs, in pixels.
   */
  glyphSize?: number;

  /**
   * The variant (color and style) of the field and its glyphs.
   */
  variant?: NodeFieldVariant;

  /**
   * The variant (color and style) of the hover state of the field and its glyphs.
   */
  hoverVariant?: NodeFieldHoverVariant;
}
