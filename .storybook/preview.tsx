import React, { PropsWithChildren } from 'react';
import { Preview, ReactRenderer } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from '@emotion/react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LIGHT_THEME } from '../src/styles/theme-light';
import { DARK_THEME } from '../src/styles/theme-dark';

interface ThemeProvidersProps {
  theme: {
    theme: Record<string, string>;
    isDarkMode: boolean;
  };
}

const ThemeProviders = ({ children, theme }: PropsWithChildren<ThemeProvidersProps>) => {
  return (
    <ThemeProvider theme={theme.theme}>
      <LeafyGreenProvider darkMode={theme.isDarkMode}>
        <div style={{ backgroundColor: theme.theme.background }}>{children}</div>
      </LeafyGreenProvider>
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        light: {
          isDarkMode: false,
          theme: LIGHT_THEME,
        },
        dark: {
          isDarkMode: true,
          theme: DARK_THEME,
        },
      },
      defaultTheme: 'light',
      Provider: ThemeProviders,
    }),
  ],
};

export default preview;
