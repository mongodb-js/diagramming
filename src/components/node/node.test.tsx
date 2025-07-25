import { screen } from '@testing-library/react';
import { NodeProps, useViewport } from '@xyflow/react';

import { render } from '@/mocks/testing-utils';
import { InternalNode } from '@/types/internal';
import { Node } from '@/components/node/node';

vi.mock('@xyflow/react', async () => {
  const actual = await vi.importActual<typeof import('@xyflow/react')>('@xyflow/react');
  return {
    ...actual,
    useViewport: vi.fn(),
  };
});

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

  beforeEach(() => {
    const mockedViewport = vi.mocked(useViewport);
    mockedViewport.mockReturnValue({ zoom: 1, x: 0, y: 0 });
  });

  it('Should show table node', () => {
    render(
      <Node
        {...DEFAULT_PROPS}
        type="table"
        data={{ title: 'orders', fields: [{ name: 'orderId', type: 'varchar' }] }}
      />,
    );
    expect(screen.getByRole('img', { name: 'Drag Icon' })).toBeInTheDocument();
    expect(screen.getByText('orders')).toBeInTheDocument();
    expect(screen.getByText('orderId')).toBeInTheDocument();
    expect(screen.getByText('varchar')).toBeInTheDocument();
  });

  it('Should show collection node', () => {
    render(
      <Node
        {...DEFAULT_PROPS}
        type="collection"
        data={{ title: 'employees', fields: [{ name: 'employeeId', type: 'string' }] }}
      />,
    );
    expect(screen.getByRole('img', { name: 'Drag Icon' })).toBeInTheDocument();
    expect(screen.getByText('employees')).toBeInTheDocument();
    expect(screen.getByText('employeeId')).toBeInTheDocument();
    expect(screen.getByText('string')).toBeInTheDocument();
  });

  it('Should show contextual zoom', () => {
    const mockedViewport = vi.mocked(useViewport);
    mockedViewport.mockReturnValue({ zoom: 0.2, x: 0, y: 0 });
    render(
      <Node
        {...DEFAULT_PROPS}
        type="collection"
        data={{ title: 'employees', fields: [{ name: 'employeeId', type: 'string' }] }}
      />,
    );
    expect(screen.queryByRole('img', { name: 'Drag Icon' })).not.toBeInTheDocument();
    expect(screen.getAllByText('employees')).toHaveLength(2);
    expect(screen.queryByText('employeeId')).not.toBeVisible();
    expect(screen.queryByText('string')).not.toBeVisible();
  });
});
