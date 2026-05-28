import { MiniMap as ReactFlowMiniMap } from '@xyflow/react';
import { Theme, useTheme } from '@emotion/react';

import { MiniMapProps } from '@/types';

const MINIMAP_WIDTH = 200;
const MINIMAP_HEIGHT = 100;

const EMPTY_PROPS = {};

export const MiniMap = (minimapProps: MiniMapProps = EMPTY_PROPS) => {
  const theme: Theme = useTheme();
  return (
    <ReactFlowMiniMap
      maskColor={theme.minimap.mask}
      nodeColor={theme.minimap.node}
      style={{
        width: MINIMAP_WIDTH,
        height: MINIMAP_HEIGHT,
        background: theme.minimap.selectionArea,
      }}
      {...minimapProps}
    />
  );
};
