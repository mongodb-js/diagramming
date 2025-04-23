import { palette } from '@leafygreen-ui/palette';
import { ConnectionLineComponentProps, getStraightPath } from '@xyflow/react';

type Props = Pick<ConnectionLineComponentProps, 'fromX' | 'fromY' | 'toX' | 'toY'>;

export const ConnectionLine = ({ fromX, fromY, toX, toY }: Props) => {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <circle cx={fromX} cy={fromY} fill={palette.blue.base} r={4} />
      <path
        data-testid={'connection-line'}
        style={{ animation: 'dashdraw 0.5s linear infinite' }}
        d={edgePath}
        fill="none"
        stroke={palette.blue.base}
        strokeDasharray={5}
        strokeWidth={2}
      />
    </g>
  );
};
