import { BaseEdge } from '@xyflow/react';
import { palette } from '@leafygreen-ui/palette';
import { SVGAttributes } from 'react';
import React from 'react';

interface Props extends SVGAttributes<SVGPathElement> {
  selected?: boolean;
  path: string;
}

const getMarker = (selected?: boolean, marker?: string) => {
  return selected ? marker?.replace(/'\)/, "-selected')") : marker;
};

export const Edge = ({ markerStart, markerEnd, selected, ...rest }: Props) => {
  return (
    <React.Fragment>
      <BaseEdge
        markerEnd={getMarker(selected, markerEnd)}
        markerStart={getMarker(selected, markerStart)}
        style={{ stroke: palette.gray.base }}
        {...rest}
      />
      {selected && (
        <BaseEdge
          markerEnd={getMarker(selected, markerEnd)}
          markerStart={getMarker(selected, markerStart)}
          style={{ stroke: palette.blue.base }}
          data-active-type="selected-edge"
          {...rest}
        />
      )}
    </React.Fragment>
  );
};
