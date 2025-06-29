import Icon from '@leafygreen-ui/icon';
import { ControlButton, Controls as ReactFlowControls, useViewport } from '@xyflow/react';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';
import styled from '@emotion/styled';

import { useDiagram } from '@/hooks/use-diagram';

const zoomTransitionOption = { duration: 500 };

const ControlsWrapper = styled(ReactFlowControls)`
  box-shadow: unset;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${spacing[300]}px;
  font-size: 11px;
  color: ${props => props.theme.controls.zoomText};
  font-family: ${fontFamilies.code};
`;

const ControlsGroup = styled.div`
  > .react-flow__controls-button {
    background-color: ${props => props.theme.controls.background};
    border: 1px solid ${palette.gray.base};
    height: ${spacing[600] + spacing[100]}px;
    width: ${spacing[600] + spacing[100]}px;
    color: ${props => props.theme.controls.buttonColor};
  }
  > .react-flow__controls-button:hover {
    background-color: ${props => props.theme.controls.backgroundHover};
  }
  > *:first-of-type {
    border-top-left-radius: ${spacing[150]}px;
    border-top-right-radius: ${spacing[150]}px;
  }
  > *:last-of-type {
    border-bottom-left-radius: ${spacing[150]}px;
    border-bottom-right-radius: ${spacing[150]}px;
  }
`;

interface DiagramControlsProps {
  title?: string;
}

export const Controls = ({ title }: DiagramControlsProps) => {
  const { zoomIn, zoomOut, fitView } = useDiagram();
  const { zoom } = useViewport();

  return (
    <ControlsWrapper position="bottom-left" showFitView={false} showInteractive={false} showZoom={false}>
      <ControlsGroup>
        <ControlButton onClick={() => zoomIn(zoomTransitionOption)}>
          <Icon glyph="Plus" />
        </ControlButton>
        <ControlButton onClick={() => zoomOut(zoomTransitionOption)}>
          <Icon glyph="Minus" />
        </ControlButton>
        <ControlButton onClick={() => fitView(zoomTransitionOption)}>
          <Icon glyph="FullScreenEnter" />
        </ControlButton>
      </ControlsGroup>
      {`${Math.round(zoom * 100)}%${title ? `\u00A0\u00A0${title}` : ''}`}
    </ControlsWrapper>
  );
};
