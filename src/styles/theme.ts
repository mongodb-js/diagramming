import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    background: string;
    minimap: {
      node: string;
      mask: string;
      selectionArea: string;
    };
  }
}
