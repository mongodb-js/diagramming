import { ReactNode } from 'react';

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
  'end-oneOrMany': {
    component: <MarkerOneOrMany />,
    orient: 'auto',
  },
  'start-one': {
    component: <MarkerOne />,
    orient: 'auto-start-reverse',
  },
  'end-one': {
    component: <MarkerOne />,
    orient: 'auto',
  },
  'start-many': {
    component: <MarkerMany />,
    orient: 'auto-start-reverse',
  },
  'end-many': {
    component: <MarkerMany />,
    orient: 'auto',
  },
};

export const MarkerList = () => {
  return (
    <svg>
      <defs>
        {Object.entries(markerList).map(([id, { component, orient }]) => (
          <Marker key={id} data-testid={id} orient={orient} id={id}>
            {component}
          </Marker>
        ))}
      </defs>
    </svg>
  );
};
