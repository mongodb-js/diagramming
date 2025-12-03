import { Node, Position, useNodes } from '@xyflow/react';
import { ComponentProps } from 'react';

import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { render, screen } from '@/mocks/testing-utils';
import { FloatingEdge } from '@/components/edge/floating-edge';
import { DEFAULT_FIELD_HEIGHT, DEFAULT_NODE_WIDTH } from '@/utilities/constants';

vi.mock('@xyflow/react', async () => {
  const actual = await vi.importActual<typeof import('@xyflow/react')>('@xyflow/react');
  return {
    ...actual,
    useNodes: vi.fn(),
  };
});

function mockNodes(nodes: Node[]) {
  const mockedNodes = vi.mocked(useNodes);
  mockedNodes.mockReturnValue(nodes);
}

describe('floating-edge', () => {
  const nodes = [
    { ...ORDERS_NODE, data: { title: ORDERS_NODE.title, fields: ORDERS_NODE.fields } },
    { ...EMPLOYEES_NODE, data: { title: EMPLOYEES_NODE.title, fields: EMPLOYEES_NODE.fields } },
  ];

  beforeEach(() => {
    mockNodes(nodes);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props?: Partial<ComponentProps<typeof FloatingEdge>>) => {
    return render(
      <FloatingEdge
        sourceX={100}
        sourceY={100}
        targetX={500}
        targetY={500}
        sourcePosition={Position.Left}
        targetPosition={Position.Top}
        id={'orders-to-employees'}
        source={'orders'}
        target={'employees'}
        {...props}
      />,
    );
  };

  describe('Without measured heights', () => {
    it('Should render edge', () => {
      renderComponent();
      const path = screen.getByTestId('floating-edge-orders-to-employees');
      expect(path).toHaveAttribute('id', 'orders-to-employees');
      expect(path).toHaveAttribute(
        'd',
        'M263 189.5L263 209.5L 263,236Q 263,241 268,241L 331,241Q 336,241 336,246L336 272.5L336 292.5',
      );
    });
  });

  describe('With measured heights', () => {
    it('Should render edge', () => {
      mockNodes([
        {
          ...nodes[0],
          measured: {
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_FIELD_HEIGHT * 2,
          },
        },
        {
          ...nodes[1],
          measured: {
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_FIELD_HEIGHT * 4,
          },
        },
      ]);
      renderComponent();
      const path = screen.getByTestId('floating-edge-orders-to-employees');
      expect(path).toHaveAttribute('id', 'orders-to-employees');
      expect(path).toHaveAttribute(
        'd',
        'M240 143.5L240 163.5L 240,213Q 240,218 245,218L 381,218Q 386,218 386,223L386 272.5L386 292.5',
      );
    });
  });

  it('Should not render edge if source does not exist', () => {
    renderComponent({ source: 'unknown' });
    expect(screen.queryByTestId('floating-edge-orders-to-employees')).not.toBeInTheDocument();
  });

  it('Should not render edge if target does not exist', () => {
    renderComponent({ target: 'unknown' });
    expect(screen.queryByTestId('floating-edge-orders-to-employees')).not.toBeInTheDocument();
  });
});
