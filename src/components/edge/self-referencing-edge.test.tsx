import { Node, Position, useNodes } from '@xyflow/react';
import { ComponentProps } from 'react';

import { EMPLOYEES_NODE } from '@/mocks/datasets/nodes';
import { render, screen } from '@/mocks/testing-utils';
import { FloatingEdge } from '@/components/edge/floating-edge';
import { SelfReferencingEdge } from '@/components/edge/self-referencing-edge';
import { DEFAULT_FIELD_HEIGHT, DEFAULT_NODE_WIDTH } from '@/utilities/constants';
import { InternalNode } from '@/types/internal';

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

describe('self-referencing-edge', () => {
  const nodes: InternalNode[] = [
    {
      ...EMPLOYEES_NODE,
      data: {
        title: EMPLOYEES_NODE.title,
        fields: EMPLOYEES_NODE.fields.map(field => ({ ...field, hasChildren: false, isVisible: true })),
      },
    },
  ];

  beforeEach(() => {
    mockNodes(nodes);
  });

  afterEach(() => {
    vi.clearAllMocks();
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

  describe('Without measured heights', () => {
    it('Should render edge', () => {
      renderComponent();
      const path = screen.getByTestId('self-referencing-edge-employees-to-employees');
      expect(path).toHaveAttribute('id', 'employees-to-employees');
      expect(path).toHaveAttribute('d', 'M422,292.5L422,262.5L584,262.5L584,378.5L551.5,378.5');
    });
  });

  describe('With measured heights', () => {
    it('Should render edge', () => {
      mockNodes([
        {
          ...nodes[0],
          measured: {
            width: DEFAULT_NODE_WIDTH,
            height: DEFAULT_FIELD_HEIGHT * 4,
          },
        },
      ]);
      renderComponent();
      const path = screen.getByTestId('self-referencing-edge-employees-to-employees');
      expect(path).toHaveAttribute('id', 'employees-to-employees');
      expect(path).toHaveAttribute('d', 'M422,292.5L422,262.5L584,262.5L584,328.5L551.5,328.5');
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
