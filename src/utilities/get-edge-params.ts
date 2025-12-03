import { Position, XYPosition } from '@xyflow/react';

import { InternalNode } from '@/types/internal';
import { FieldId } from '@/types/node';
import { DEFAULT_FIELD_HEIGHT, DEFAULT_MARKER_SIZE, DEFAULT_NODE_WIDTH } from '@/utilities/constants';

import { getFieldYPosition, getNodeHeight, getNodeWidth } from './node-dimensions';

/**
 * Returns the coordinates where a line connecting the centers of the source and target nodes intersects
 * the edges of those nodes. This implementation is copied from:
 * https://github.com/xyflow/xyflow/blob/main/examples/react/src/examples/FloatingEdges/utils.ts
 *
 * @param intersectionNode The source node
 * @param targetNode The target node
 */
const getNodeIntersection = (intersectionNode: InternalNode, targetNode: InternalNode): XYPosition => {
  const intersectionNodeWidth = getNodeWidth(intersectionNode);
  const intersectionNodeHeight = getNodeHeight(intersectionNode);
  const targetPosition = targetNode.position;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNode.position.x + w;
  const y2 = intersectionNode.position.y + h;
  const x1 = targetPosition.x + w;
  const y1 = targetPosition.y + h;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
};

/**
 * Returns the coordinates where the edge should connect to a specific field
 * (on the left or right side of the node)
 *
 * @param intersectionNode The source node
 * @param targetNode The target node
 * @param intersectionFieldId The id of the field on the source node
 */
export const getNodeIntersectionAtField = (
  intersectionNode: InternalNode,
  targetNode: InternalNode,
  intersectionFieldId: FieldId,
): XYPosition => {
  const intersectionNodeWidth = getNodeWidth(intersectionNode);
  const intersectionNodeHeight = getNodeHeight(intersectionNode);

  // horizontally, the edge intersects either on the right or the left edge of the node
  const positionDiff = intersectionNode.position.x - targetNode.position.x;
  const w =
    // if the nodes are close enough, we connect the same sides
    Math.abs(positionDiff) < DEFAULT_NODE_WIDTH / 2
      ? intersectionNodeWidth
      : // otherwise we connect the sides facing each other
        positionDiff < 0
        ? intersectionNodeWidth
        : 0;

  // vertical intersection is calculated based on the field index
  const intersectionFieldIndex = intersectionNode.data.fields.findIndex(
    ({ id }) => JSON.stringify(id) === JSON.stringify(intersectionFieldId),
  );
  const h = intersectionNodeHeight ? getFieldYPosition(intersectionFieldIndex) + DEFAULT_FIELD_HEIGHT / 2 : 0;

  // the final position is added to the node position
  const x = intersectionNode.position.x + w;
  const y = intersectionNode.position.y + h;

  return { x, y };
};

/**
 * Normalises the edge position based on co-ordinates of the edge
 * @param node The node where the edge is pointing from. This implementation is copied from:
 * https://github.com/xyflow/xyflow/blob/main/examples/react/src/examples/FloatingEdges/utils.ts
 *
 * @param intersectionPoint The position of the edge
 */
const getEdgePosition = (node: InternalNode, intersectionPoint: XYPosition) => {
  const n = { ...node.position, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (getNodeWidth(n) - 1)) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + (getNodeHeight(n) - 1)) {
    return Position.Bottom;
  }

  return Position.Top;
};

/**
 * Offsets the edge position based on the size of the marker
 *
 * @param position Direction of the edge
 * @param x Co-ordinates of the edge
 * @param y Co-ordinates of the edge
 */
const offsetPosition = (position: Position, { x, y }: { x: number; y: number }) => {
  const offset = DEFAULT_MARKER_SIZE / 2;
  switch (position) {
    case Position.Left:
      return { x: x - offset, y };
    case Position.Top:
      return { x, y: y - offset };
    case Position.Right:
      return { x: x + offset, y };
    case Position.Bottom:
      return { x, y: y + offset };
    default:
      return { x, y };
  }
};

/**
 * Returns the coordinates where a line connecting the centers of the source and target nodes intersects
 * the edges of those nodes. This implementation is copied from:
 * https://github.com/xyflow/xyflow/blob/main/examples/react/src/examples/FloatingEdges/utils.ts
 *
 * @param source The source node
 * @param target The target node
 */
export const getEdgeParams = (source: InternalNode, target: InternalNode) => {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  const sourceOffsetPosition = offsetPosition(sourcePos, sourceIntersectionPoint);
  const targetOffsetPosition = offsetPosition(targetPos, targetIntersectionPoint);

  return {
    sx: sourceOffsetPosition.x,
    sy: sourceOffsetPosition.y,
    tx: targetOffsetPosition.x,
    ty: targetOffsetPosition.y,
    sourcePos,
    targetPos,
  };
};

/**
 * Returns the coordinates where a line connecting the fields of the source and target nodes intersects
 *
 * @param source The source node
 * @param target The target node
 */
export const getFieldEdgeParams = (
  source: InternalNode,
  target: InternalNode,
  sourceFieldId: FieldId,
  targetFieldId: FieldId,
) => {
  const sourceIntersectionPoint = getNodeIntersectionAtField(source, target, sourceFieldId);
  const targetIntersectionPoint = getNodeIntersectionAtField(target, source, targetFieldId);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  const sourceOffsetPosition = offsetPosition(sourcePos, sourceIntersectionPoint);
  const targetOffsetPosition = offsetPosition(targetPos, targetIntersectionPoint);

  return {
    sx: sourceOffsetPosition.x,
    sy: sourceOffsetPosition.y,
    tx: targetOffsetPosition.x,
    ty: targetOffsetPosition.y,
    sourcePos,
    targetPos,
  };
};
