import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    background: string;
    controls: {
      background: string;
      backgroundHover: string;
      zoomText: string;
    };
    minimap: {
      node: string;
      mask: string;
      selectionArea: string;
    };
  }
}
