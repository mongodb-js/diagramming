import { useCallback, useState, MouseEvent as ReactMouseEvent } from 'react';
import { Decorator } from '@storybook/react';

import { DiagramProps } from '@/types';

export const DiagramSelectableFieldsDecorator: Decorator<DiagramProps> = (Story, context) => {
  const [selectedFields, setSelectedFields] = useState<{ nodeId: string; fieldId: string[] }[]>([]);

  const onFieldClick = useCallback(
    (
      event: ReactMouseEvent,
      params: {
        nodeId: string;
        id: string[];
      },
    ) => {
      setSelectedFields([
        {
          nodeId: params.nodeId,
          fieldId: params.id,
        },
      ]);
    },
    [],
  );

  return Story({
    ...context,
    args: {
      ...context.args,
      onFieldClick,
      selectedFields,
    },
  });
};
