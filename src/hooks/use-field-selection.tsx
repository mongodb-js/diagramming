import React, { createContext, useContext, useMemo, ReactNode } from 'react';

import { stringArrayCompare } from '@/utilities/string-array-compare';

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
