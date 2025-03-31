import { MiniMap as ReactFlowMiniMap } from '@xyflow/react';
import { Theme, useTheme } from '@emotion/react';

const MINIMAP_WIDTH = 200;
const MINIMAP_HEIGHT = 100;

export const MiniMap = () => {
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
    />
  );
};
