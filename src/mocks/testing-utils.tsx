import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { ReactFlowProvider } from '@xyflow/react';

import { LIGHT_THEME } from '@/styles/theme-light';
export * from '@testing-library/react';
export { renderHook } from '@testing-library/react-hooks';

export const wrapper = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={LIGHT_THEME}>
    <ReactFlowProvider>{children}</ReactFlowProvider>
  </ThemeProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult => render(ui, { wrapper, ...options });
export * from '@testing-library/react';
export { customRender as render };
