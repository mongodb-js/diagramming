import { ReactNode } from 'react';
import { palette } from '@leafygreen-ui/palette';

import { Marker } from '@/components/markers/marker';
import MarkerOneOrMany from '@/assets/markers/marker-one-or-many.svg?react';
import MarkerMany from '@/assets/markers/marker-many.svg?react';
import MarkerOne from '@/assets/markers/marker-one.svg?react';

interface MarkerProps extends React.SVGAttributes<SVGMarkerElement> {
  component: ReactNode;
}

const markerList: Record<string, MarkerProps> = {
  'start-oneOrMany': {
    component: <MarkerOneOrMany />,
    orient: 'auto-start-reverse',
  },
  'start-oneOrMany-selected': {
    component: <MarkerOneOrMany />,
    orient: 'auto-start-reverse',
    fill: palette.blue.base,
  },
  'end-oneOrMany': {
    component: <MarkerOneOrMany />,
    orient: 'auto',
  },
  'end-oneOrMany-selected': {
    component: <MarkerOneOrMany />,
    orient: 'auto',
    fill: palette.blue.base,
  },
  'start-one': {
    component: <MarkerOne />,
    orient: 'auto-start-reverse',
  },
  'start-one-selected': {
    component: <MarkerOne />,
    orient: 'auto-start-reverse',
    fill: palette.blue.base,
  },
  'end-one': {
    component: <MarkerOne />,
    orient: 'auto',
  },
  'end-one-selected': {
    component: <MarkerOne />,
    orient: 'auto',
    fill: palette.blue.base,
  },
  'start-many': {
    component: <MarkerMany />,
    orient: 'auto-start-reverse',
  },
  'start-many-selected': {
    component: <MarkerMany />,
    orient: 'auto-start-reverse',
    fill: palette.blue.base,
  },
  'end-many': {
    component: <MarkerMany />,
    orient: 'auto',
  },
  'end-many-selected': {
    component: <MarkerMany />,
    orient: 'auto',
    fill: palette.blue.base,
  },
};

export const MarkerList = () => {
  return (
    <svg>
      <defs>
        {Object.entries(markerList).map(([id, { component, ...rest }]) => (
          <Marker key={id} data-testid={id} id={id} {...rest}>
            {component}
          </Marker>
        ))}
      </defs>
    </svg>
  );
};
