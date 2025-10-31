import React, { createContext, useContext, useMemo, ReactNode } from 'react';

import {
  OnFieldClickHandler,
  OnAddFieldToNodeClickHandler,
  OnNodeExpandHandler,
  OnAddFieldToObjectFieldClickHandler,
  OnFieldNameChangeHandler,
  OnFieldTypeChangeHandler,
} from '@/types';

interface EditableDiagramInteractionsContextType {
  onClickField?: OnFieldClickHandler;
  onClickAddFieldToNode?: OnAddFieldToNodeClickHandler;
  onNodeExpandToggle?: OnNodeExpandHandler;
  onClickAddFieldToObjectField?: OnAddFieldToObjectFieldClickHandler;
  onChangeFieldName?: OnFieldNameChangeHandler;
  onChangeFieldType?: OnFieldTypeChangeHandler;
  fieldTypes?: string[];
}

const EditableDiagramInteractionsContext = createContext<EditableDiagramInteractionsContextType | undefined>(undefined);

interface EditableDiagramInteractionsProviderProps {
  children: ReactNode;
  fieldTypes?: string[];
  onFieldClick?: OnFieldClickHandler;
  onAddFieldToNodeClick?: OnAddFieldToNodeClickHandler;
  onNodeExpandToggle?: OnNodeExpandHandler;
  onAddFieldToObjectFieldClick?: OnAddFieldToObjectFieldClickHandler;
  onFieldNameChange?: OnFieldNameChangeHandler;
  onFieldTypeChange?: OnFieldTypeChangeHandler;
}

export const EditableDiagramInteractionsProvider: React.FC<EditableDiagramInteractionsProviderProps> = ({
  children,
  fieldTypes,
  onFieldClick,
  onAddFieldToNodeClick,
  onNodeExpandToggle,
  onAddFieldToObjectFieldClick,
  onFieldNameChange,
  onFieldTypeChange,
}) => {
  const value: EditableDiagramInteractionsContextType = useMemo(() => {
    return {
      ...(onFieldClick
        ? {
            onClickField: onFieldClick,
          }
        : undefined),
      ...(onAddFieldToNodeClick
        ? {
            onClickAddFieldToNode: onAddFieldToNodeClick,
          }
        : undefined),
      ...(onNodeExpandToggle
        ? {
            onNodeExpandToggle: onNodeExpandToggle,
          }
        : undefined),
      ...(onAddFieldToObjectFieldClick
        ? {
            onClickAddFieldToObjectField: onAddFieldToObjectFieldClick,
          }
        : undefined),
      ...(onFieldNameChange
        ? {
            onChangeFieldName: onFieldNameChange,
          }
        : undefined),
      ...(onFieldTypeChange
        ? {
            onChangeFieldType: onFieldTypeChange,
          }
        : undefined),
      fieldTypes,
    };
  }, [
    fieldTypes,
    onFieldClick,
    onAddFieldToNodeClick,
    onNodeExpandToggle,
    onAddFieldToObjectFieldClick,
    onFieldNameChange,
    onFieldTypeChange,
  ]);

  return (
    <EditableDiagramInteractionsContext.Provider value={value}>{children}</EditableDiagramInteractionsContext.Provider>
  );
};

export const useEditableDiagramInteractions = (): EditableDiagramInteractionsContextType => {
  const context = useContext(EditableDiagramInteractionsContext);

  if (context === undefined) {
    throw new Error('useEditableDiagramInteractions must be used within a EditableDiagramInteractionsProvider');
  }

  return context;
};
