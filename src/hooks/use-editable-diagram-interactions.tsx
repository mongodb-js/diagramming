import React, { createContext, useContext, useMemo, ReactNode } from 'react';

import {
  OnFieldClickHandler,
  OnAddFieldToNodeClickHandler,
  OnNodeExpandHandler,
  OnAddFieldToObjectFieldClickHandler,
  OnFieldNameChangeHandler,
  OnFieldExpandHandler,
} from '@/types';

interface EditableDiagramInteractionsContextType {
  onClickField?: OnFieldClickHandler;
  onClickAddFieldToNode?: OnAddFieldToNodeClickHandler;
  onNodeExpandToggle?: OnNodeExpandHandler;
  onFieldExpandToggle?: OnFieldExpandHandler;
  onClickAddFieldToObjectField?: OnAddFieldToObjectFieldClickHandler;
  onChangeFieldName?: OnFieldNameChangeHandler;
}

const EditableDiagramInteractionsContext = createContext<EditableDiagramInteractionsContextType | undefined>(undefined);

interface EditableDiagramInteractionsProviderProps {
  children: ReactNode;
  onFieldClick?: OnFieldClickHandler;
  onAddFieldToNodeClick?: OnAddFieldToNodeClickHandler;
  onNodeExpandToggle?: OnNodeExpandHandler;
  onFieldExpandToggle?: OnFieldExpandHandler;
  onAddFieldToObjectFieldClick?: OnAddFieldToObjectFieldClickHandler;
  onFieldNameChange?: OnFieldNameChangeHandler;
}

export const EditableDiagramInteractionsProvider: React.FC<EditableDiagramInteractionsProviderProps> = ({
  children,
  onFieldClick,
  onAddFieldToNodeClick,
  onNodeExpandToggle,
  onFieldExpandToggle,
  onAddFieldToObjectFieldClick,
  onFieldNameChange,
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
            onNodeExpandToggle,
          }
        : undefined),
      ...(onFieldExpandToggle
        ? {
            onFieldExpandToggle,
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
    };
  }, [
    onFieldClick,
    onAddFieldToNodeClick,
    onNodeExpandToggle,
    onAddFieldToObjectFieldClick,
    onFieldNameChange,
    onFieldExpandToggle,
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
