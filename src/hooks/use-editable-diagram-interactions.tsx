import React, { createContext, useContext, useMemo, ReactNode } from 'react';

import { OnFieldClickHandler, OnAddFieldToNodeClickHandler, OnAddFieldToObjectFieldClickHandler } from '@/types';

interface EditableDiagramInteractionsContextType {
  onClickField?: OnFieldClickHandler;
  onClickAddFieldToNode?: OnAddFieldToNodeClickHandler;
  onClickAddFieldToObjectField?: OnAddFieldToObjectFieldClickHandler;
}

const EditableDiagramInteractionsContext = createContext<EditableDiagramInteractionsContextType | undefined>(undefined);

interface EditableDiagramInteractionsProviderProps {
  children: ReactNode;
  onFieldClick?: OnFieldClickHandler;
  onAddFieldToNodeClick?: OnAddFieldToNodeClickHandler;
  onAddFieldToObjectFieldClick?: OnAddFieldToObjectFieldClickHandler;
}

export const EditableDiagramInteractionsProvider: React.FC<EditableDiagramInteractionsProviderProps> = ({
  children,
  onFieldClick,
  onAddFieldToNodeClick,
  onAddFieldToObjectFieldClick,
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
      ...(onAddFieldToObjectFieldClick
        ? {
            onClickAddFieldToObjectField: onAddFieldToObjectFieldClick,
          }
        : undefined),
    };
  }, [onFieldClick, onAddFieldToNodeClick, onAddFieldToObjectFieldClick]);

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
