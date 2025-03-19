import { Canvas } from '@/diagram/canvas/canvas';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { ThemeProvider } from '@emotion/react';
import { ComponentProps } from 'react';
import { DARK_THEME, LIGHT_THEME } from '@/styles/styles';

interface Props extends ComponentProps<typeof Canvas> {
  isDarkMode?: boolean;
}

export const Diagram = ({ isDarkMode, ...rest }: Props) => {
  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <LeafyGreenProvider darkMode={isDarkMode}>
        <Canvas {...rest} />
      </LeafyGreenProvider>
    </ThemeProvider>
  );
};
