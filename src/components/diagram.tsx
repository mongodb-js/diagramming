import '@xyflow/react/dist/style.css';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { ThemeProvider } from '@emotion/react';

import { Canvas } from '@/components/canvas/canvas';
import { DARK_THEME } from '@/styles/theme-dark';
import { LIGHT_THEME } from '@/styles/theme-light';
import { DiagramProps } from '@/types/component-props';

export const Diagram = ({ isDarkMode, ...rest }: DiagramProps) => {
  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <LeafyGreenProvider darkMode={isDarkMode}>
        <Canvas {...rest} />
      </LeafyGreenProvider>
    </ThemeProvider>
  );
};
