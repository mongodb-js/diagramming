import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { LIGHT_THEME } from '@/styles/theme-light';
import { ReactFlowProvider } from '@xyflow/react';
export * from '@testing-library/react';

export const wrapper = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={LIGHT_THEME}>
    <ReactFlowProvider>{children}</ReactFlowProvider>
  </ThemeProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) => render(ui, { wrapper, ...options });
export * from '@testing-library/react';
export { customRender as render };
