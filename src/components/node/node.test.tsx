import { screen } from '@testing-library/react';
import { NodeProps as XyFlowNodeProps, useViewport } from '@xyflow/react';
import { userEvent } from '@testing-library/user-event';
import { palette } from '@leafygreen-ui/palette';

import { render } from '@/mocks/testing-utils';
import { InternalNode } from '@/types/internal';
import { NodeProps } from '@/types/node';
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
  const DEFAULT_PROPS: XyFlowNodeProps<InternalNode> = {
    id: 'id',
    type: 'table',
    data: { title: 'title', visibleFields: [], externalNode: {} as unknown as NodeProps },
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
        data={{
          title: 'orders',
          visibleFields: [{ name: 'orderId', type: 'varchar', hasChildren: false }],
          externalNode: {} as unknown as NodeProps,
        }}
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
        data={{
          title: 'employees',
          visibleFields: [{ name: 'employeeId', type: 'string', hasChildren: false }],
          externalNode: {} as unknown as NodeProps,
        }}
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
        data={{
          title: 'employees',
          visibleFields: [{ name: 'employeeId', type: 'string', hasChildren: false }],
          externalNode: {} as unknown as NodeProps,
        }}
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

  describe('when onNodeExpandToggle is supplied', () => {
    it('Should show a clickable button to collapse when there are no explicitly collapsed fields', async () => {
      const onNodeExpandToggleMock = vi.fn();
      const expandedFields = [
        {
          name: 'field1',
          expanded: true,
          hasChildren: true,
        },
        {
          // this field is not explicitly collapsed
          name: 'field2',
          hasChildren: true,
        },
      ];

      render(
        <Node
          {...DEFAULT_PROPS}
          onNodeExpandToggle={onNodeExpandToggleMock}
          data={{ title: 'abc', visibleFields: expandedFields, externalNode: {} as unknown as NodeProps }}
        />,
      );
      const button = screen.getByRole('button', { name: 'Collapse all' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('title', 'Collapse all');
      expect(onNodeExpandToggleMock).not.toHaveBeenCalled();
      await userEvent.click(button);
      expect(onNodeExpandToggleMock).toHaveBeenCalled();
    });

    it('Should show a clickable button to expand when some fields are not expanded', async () => {
      const onNodeExpandToggleMock = vi.fn();
      const variedFields = [
        {
          name: 'field1',
          expanded: true,
          hasChildren: true,
        },
        {
          name: 'field2',
          expanded: false,
          hasChildren: true,
        },
      ];

      render(
        <Node
          {...DEFAULT_PROPS}
          onNodeExpandToggle={onNodeExpandToggleMock}
          data={{ title: 'abc', visibleFields: variedFields, externalNode: {} as unknown as NodeProps }}
        />,
      );
      const button = screen.getByRole('button', { name: 'Expand all' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('title', 'Expand all');
      expect(onNodeExpandToggleMock).not.toHaveBeenCalled();
      await userEvent.click(button);
      expect(onNodeExpandToggleMock).toHaveBeenCalled();
    });
  });

  it('Should prioritise borderVariant over selected prop when setting the border', () => {
    render(
      <Node {...DEFAULT_PROPS} selected type="collection" data={{ ...DEFAULT_PROPS.data, borderVariant: 'subtle' }} />,
    );
    expect(getComputedStyle(screen.getByTestId('node-border')).outline).toEqual(`2px solid ${palette.gray.base}`);
  });
});
