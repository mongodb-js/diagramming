import { Decorator } from '@storybook/react';

import { DiagramProps } from '@/types';
import { useEditableNodes } from '@/mocks/decorators/diagram-editable-interactions.decorator';
import { useStressTestNodesAndEdges } from '@/mocks/decorators/diagram-stress-test.decorator';

export const DiagramEditableStressTestDecorator: Decorator<DiagramProps> = (Story, context) => {
  const { nodes: initialNodes, edges } = useStressTestNodesAndEdges(100);
  const editableArgs = useEditableNodes(initialNodes);

  return Story({
    ...context,
    args: {
      ...context.args,
      ...editableArgs,
      edges: editableArgs.nodes.length > 0 ? edges : [],
    },
  });
};
