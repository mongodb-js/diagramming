import React, { createContext, useContext, useMemo, ReactNode } from 'react';

import { OnFieldClickHandler } from '@/types';
import { stringArrayCompare } from '@/utilities/string-array-compare';

interface FieldSelectionContextType {
  enabled: boolean;
  fieldProps:
    | {
        onClick: OnFieldClickHandler;
      }
    | undefined;
}

const FieldSelectionContext = createContext<FieldSelectionContextType | undefined>(undefined);

interface FieldSelectionProviderProps {
  children: ReactNode;
  onFieldClick?: OnFieldClickHandler;
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

type SelectedFieldsContextType = {
  nodeId: string;
  fieldId: string[];
}[];

const SelectedFieldsContext = createContext<SelectedFieldsContextType | undefined>(undefined);

interface SelectedFieldsProviderProps {
  children: ReactNode;
  selectedFields?: { nodeId: string; fieldId: string[] }[];
}

export const SelectedFieldsProvider: React.FC<SelectedFieldsProviderProps> = ({ children, selectedFields }) => {
  const value: SelectedFieldsContextType = useMemo(() => selectedFields ?? [], [selectedFields]);

  return <SelectedFieldsContext.Provider value={value}>{children}</SelectedFieldsContext.Provider>;
};

export const useIsFieldSelected = (nodeId: string, fieldId: string[]): boolean => {
  const context = useContext(SelectedFieldsContext);

  if (context === undefined) {
    throw new Error('useIsFieldSelected must be used within a SelectedFieldsProvider');
  }

  const isSelected = context.some(field => {
    return field.nodeId === nodeId && stringArrayCompare(field.fieldId, fieldId);
  });

  return isSelected;
};

const noSelection: string[][] = [];
export const useSelectedFieldsInNode = (nodeId: string): string[][] => {
  const context = useContext(SelectedFieldsContext);

  if (context === undefined) {
    throw new Error('useSelectedFieldsInNode must be used within a SelectedFieldsProvider');
  }

  const useSelectedFieldsInNode = useMemo(() => {
    const selectedFieldInNode = context.filter(field => field.nodeId === nodeId).map(field => field.fieldId);
    if (selectedFieldInNode.length === 0) {
      // Performance optimization, return a constant empty array.
      return noSelection;
    }
    return selectedFieldInNode;
  }, [context, nodeId]);

  return useSelectedFieldsInNode;
};
