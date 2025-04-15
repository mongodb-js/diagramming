import { Position, useNodes } from '@xyflow/react';
import { ComponentProps } from 'react';

import { EMPLOYEES_NODE } from '@/mocks/datasets/nodes';
import { render, screen } from '@/mocks/testing-utils';
import { FloatingEdge } from '@/components/edge/floating-edge';
import { SelfReferencingEdge } from '@/components/edge/self-referencing-edge';

vi.mock('@xyflow/react', async () => {
  const actual = await vi.importActual<typeof import('@xyflow/react')>('@xyflow/react');
  return {
    ...actual,
    useNodes: vi.fn(),
  };
});

describe('self-referencing-edge', () => {
  beforeEach(() => {
    const nodes = [{ ...EMPLOYEES_NODE, data: { title: EMPLOYEES_NODE.title, fields: EMPLOYEES_NODE.fields } }];
    const mockedNodes = vi.mocked(useNodes);
    mockedNodes.mockReturnValue(nodes);
  });

  const renderComponent = (props?: Partial<ComponentProps<typeof FloatingEdge>>) => {
    return render(
      <SelfReferencingEdge
        sourceX={100}
        sourceY={100}
        targetX={100}
        targetY={100}
        sourcePosition={Position.Left}
        targetPosition={Position.Top}
        id={'employees-to-employees'}
        source={'employees'}
        target={'employees'}
        {...props}
      />,
    );
  };

  it('Should render edge', () => {
    renderComponent();
    const path = screen.getByTestId('self-referencing-edge-employees-to-employees');
    expect(path).toHaveAttribute('id', 'employees-to-employees');
    expect(path).toHaveAttribute('d', 'M422,300L422,270L584,270L584,336L544,336');
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
