import { screen } from '@testing-library/react';
import { NodeProps } from '@xyflow/react';

import { render } from '@/mocks/testing-utils';
import { Node } from '@/components/node/node';
import { InternalNode } from '@/types/internal';

describe('node', () => {
  const DEFAULT_PROPS: NodeProps<InternalNode> = {
    id: 'id',
    type: 'table',
    data: { title: 'title', fields: [] },
    dragging: false,
    zIndex: 0,
    selectable: false,
    deletable: false,
    selected: false,
    draggable: false,
    isConnectable: false,
    positionAbsoluteX: 0,
    positionAbsoluteY: 0,
  };

  it('Should show table node', () => {
    render(<Node {...DEFAULT_PROPS} type="table" data={{ title: 'orders', fields: [] }} />);
    expect(screen.getByText('orders')).toBeInTheDocument();
  });

  it('Should show collection node', () => {
    render(<Node {...DEFAULT_PROPS} type="collection" data={{ title: 'employees', fields: [] }} />);
    expect(screen.getByText('employees')).toBeInTheDocument();
  });
});
