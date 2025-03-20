import { Canvas } from '@/components/canvas/canvas';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { ComponentProps } from 'react';
import { DARK_THEME } from '@/styles/theme-dark';
import { LIGHT_THEME } from '@/styles/theme-light';
import { ThemeProvider } from '@emotion/react';

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
