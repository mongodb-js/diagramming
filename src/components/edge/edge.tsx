import { BaseEdge } from '@xyflow/react';
import { palette } from '@leafygreen-ui/palette';
import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGPathElement> {
  selected?: boolean;
  path: string;
}

const getMarker = (selected?: boolean, marker?: string) => {
  return selected ? marker?.replace(/'\)/, "-selected')") : marker;
};

export const Edge = ({ markerStart, markerEnd, selected, ...rest }: Props) => {
  return (
    <BaseEdge
      markerEnd={getMarker(selected, markerEnd)}
      markerStart={getMarker(selected, markerStart)}
      style={{ stroke: selected ? palette.blue.base : palette.gray.base }}
      {...rest}
    />
  );
};
