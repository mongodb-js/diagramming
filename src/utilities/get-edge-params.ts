import { Position, XYPosition } from '@xyflow/react';

import { InternalNode } from '@/types/internal';
import { DEFAULT_MARKER_SIZE } from '@/utilities/constants';

/**
 * Returns the coordinates where a line connecting the centers of the source and target nodes intersects
 * the edges of those nodes. This implementation is copied from:
 * https://github.com/xyflow/xyflow/blob/main/examples/react/src/examples/FloatingEdges/utils.ts
 *
 * @param intersectionNode The source node
 * @param targetNode The target node
 */
const getNodeIntersection = (intersectionNode: InternalNode, targetNode: InternalNode): XYPosition => {
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } = intersectionNode.measured ?? {
    width: 0,
    height: 0,
  };
  const targetPosition = targetNode.position;

  const w = (intersectionNodeWidth ?? 0) / 2;
  const h = (intersectionNodeHeight ?? 0) / 2;

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
  if (px >= nx + (n.measured?.width ?? 0) - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + (n.measured?.height ?? 0) - 1) {
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
