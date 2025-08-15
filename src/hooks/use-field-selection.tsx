import React, { createContext, useContext, useMemo, ReactNode } from 'react';

import { FieldId } from '@/types';

interface FieldSelectionContextType {
  enabled: boolean;
  fieldProps:
    | {
        onClick: (event: React.MouseEvent, params: { id: FieldId; nodeId: string }) => void;
      }
    | undefined;
}

const FieldSelectionContext = createContext<FieldSelectionContextType | undefined>(undefined);

interface FieldSelectionProviderProps {
  children: ReactNode;
  onFieldClick?: (event: React.MouseEvent, params: { id: FieldId; nodeId: string }) => void;
}

export const FieldSelectionProvider: React.FC<FieldSelectionProviderProps> = ({ children, onFieldClick }) => {
  const value: FieldSelectionContextType = useMemo(
    () => ({
      enabled: !!true,
      fieldProps: onFieldClick
        ? {
            onClick: onFieldClick,
          }
        : undefined,
    }),
    [onFieldClick],
  );

  return <FieldSelectionContext.Provider value={value}>{children}</FieldSelectionContext.Provider>;
};

export const useFieldSelection = (): FieldSelectionContextType => {
  const context = useContext(FieldSelectionContext);

  if (context === undefined) {
    throw new Error('useFieldSelection must be used within a FieldSelectionProvider');
  }

  return context;
};
