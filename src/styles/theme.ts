import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    background: string;
    controls: {
      background: string;
      backgroundHover: string;
      zoomText: string;
      buttonColor: string;
    };
    minimap: {
      node: string;
      mask: string;
      selectionArea: string;
    };
    node: {
      background: string;
      backgroundHeader: string;
      backgroundHover: string;
      color: string;
      border: string;
      icon: string;
      relationalAccent: string;
      mongoDBAccent: string;
      disabledAccent: string;
      disabledHeader: string;
      disabledColor: string;
      headerIcon: string;
      fieldIconButton: string;
      fieldIconButtonHoverBackground: string;
    };
  }
}
