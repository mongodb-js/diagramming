import { Position, useNodes } from '@xyflow/react';
import { ComponentProps } from 'react';

import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { render, screen } from '@/mocks/testing-utils';
import { FloatingEdge } from '@/components/edge/floating-edge';

vi.mock('@xyflow/react', async () => {
  const actual = await vi.importActual<typeof import('@xyflow/react')>('@xyflow/react');
  return {
    ...actual,
    useNodes: vi.fn(),
  };
});

describe('floating-edge', () => {
  beforeEach(() => {
    const nodes = [
      { ...ORDERS_NODE, data: { title: ORDERS_NODE.title, fields: ORDERS_NODE.fields } },
      { ...EMPLOYEES_NODE, data: { title: EMPLOYEES_NODE.title, fields: EMPLOYEES_NODE.fields } },
    ];
    const mockedNodes = vi.mocked(useNodes);
    mockedNodes.mockReturnValue(nodes);
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

  it('Should render edge', () => {
    renderComponent();
    const path = screen.getByTestId('floating-edge-orders-to-employees');
    expect(path).toHaveAttribute('id', 'orders-to-employees');
    expect(path).toHaveAttribute(
      'd',
      'M240 136L240 156L 240,213Q 240,218 245,218L 381,218Q 386,218 386,223L386 280L386 300',
    );
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
