import { PropsWithChildren } from 'react';
import { palette } from '@leafygreen-ui/palette';

import { DEFAULT_MARKER_SIZE } from '@/utilities/constants';

type Props = PropsWithChildren<React.SVGAttributes<SVGMarkerElement>>;

export const Marker = ({ children, id, ...rest }: Props) => {
  return (
    <marker
      id={id}
      markerHeight={DEFAULT_MARKER_SIZE}
      markerWidth={DEFAULT_MARKER_SIZE}
      refX={DEFAULT_MARKER_SIZE / 2}
      refY={DEFAULT_MARKER_SIZE / 2}
      fill={palette.gray.base}
      {...rest}
    >
      {children}
    </marker>
  );
};
