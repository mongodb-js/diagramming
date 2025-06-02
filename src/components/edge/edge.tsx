import { BaseEdge } from '@xyflow/react';
import { palette } from '@leafygreen-ui/palette';
import { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGPathElement> {
  selected?: boolean;
  path: string;
  labelX: number;
  labelY: number;
}

const getMarker = (selected?: boolean, marker?: string) => {
  return selected ? marker?.replace(/'\)/, "-selected')") : marker;
};

export const Edge = ({ markerStart, markerEnd, selected, labelX, labelY, ...rest }: Props) => {
  return (
    <BaseEdge
      markerEnd={getMarker(selected, markerEnd)}
      markerStart={getMarker(selected, markerStart)}
      label={'my label'}
      labelX={labelX}
      labelY={labelY}
      // labelShowBg={true}
      // labelStyle={{
      //   fill: palette.black,
      //   fontSize: '12px',
      //   fontWeight: 500,
      // }}
      // labelBgStyle={{
      //   fill: palette.white,
      // }}
      {...rest}
    />
  );
};
