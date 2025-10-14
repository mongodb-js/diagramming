import { screen } from '@testing-library/react';
import { NodeProps, useViewport } from '@xyflow/react';
import { userEvent } from '@testing-library/user-event';
import { palette } from '@leafygreen-ui/palette';

import { render } from '@/mocks/testing-utils';
import { InternalNode } from '@/types/internal';
import { Node as NodeComponent } from '@/components/node/node';
import { EditableDiagramInteractionsProvider } from '@/hooks/use-editable-diagram-interactions';

const Node = ({
  onAddFieldToNodeClick,
  onNodeExpandToggle,
  ...props
}: React.ComponentProps<typeof NodeComponent> & {
  onAddFieldToNodeClick?: () => void;
  onNodeExpandToggle?: () => void;
}) => (
  <EditableDiagramInteractionsProvider
    onAddFieldToNodeClick={onAddFieldToNodeClick}
    onNodeExpandToggle={onNodeExpandToggle}
  >
    <NodeComponent {...props} />
  </EditableDiagramInteractionsProvider>
);

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
    const button = screen.queryByRole('button', { name: 'Add Field' });
    expect(button).not.toBeInTheDocument();
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

  it('Should show a clickable button to add a field when add field is supplied', async () => {
    const onAddFieldToNodeClickMock = vi.fn();

    render(<Node {...DEFAULT_PROPS} onAddFieldToNodeClick={onAddFieldToNodeClickMock} />);
    const button = screen.getByRole('button', { name: 'Add Field' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Add Field');
    expect(onAddFieldToNodeClickMock).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(onAddFieldToNodeClickMock).toHaveBeenCalled();
  });

  it('Should show a clickable button to toggle expand collapse when onNodeExpandToggle is supplied', async () => {
    const onNodeExpandToggleMock = vi.fn();

    render(<Node {...DEFAULT_PROPS} onNodeExpandToggle={onNodeExpandToggleMock} />);
    const button = screen.getByRole('button', { name: 'Toggle Expand / Collapse Fields' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Toggle Expand / Collapse Fields');
    expect(onNodeExpandToggleMock).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(onNodeExpandToggleMock).toHaveBeenCalled();
  });

  it('Should prioritise borderVariant over selected prop when setting the border', () => {
    render(
      <Node {...DEFAULT_PROPS} selected type="collection" data={{ ...DEFAULT_PROPS.data, borderVariant: 'subtle' }} />,
    );
    expect(getComputedStyle(screen.getByTestId('node-border')).outline).toEqual(`2px solid ${palette.gray.base}`);
  });
});
