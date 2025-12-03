import { Node, Position, useNodes } from '@xyflow/react';
import { ComponentProps } from 'react';

import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { render, screen } from '@/mocks/testing-utils';
import { FieldEdge } from '@/components/edge/field-edge';

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

describe('field-edge', () => {
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

  const renderComponent = (props?: Partial<ComponentProps<typeof FieldEdge>>) => {
    return render(
      <FieldEdge
        sourceX={100}
        sourceY={100}
        targetX={500}
        targetY={500}
        sourcePosition={Position.Left}
        targetPosition={Position.Top}
        id={'orders-to-employees'}
        source={'orders'}
        target={'employees'}
        data={{ sourceFieldId: ['ORDER_ID'], targetFieldId: ['employeeDetail'] }}
        {...props}
      />,
    );
  };

  describe('With the nodes positioned next to each other', () => {
    it('Should render edge', () => {
      mockNodes([
        {
          ...nodes[0],
          position: { x: 100, y: 100 },
        },
        {
          ...nodes[1],
          position: { x: 100, y: 250 },
        },
      ]);
      renderComponent();
      const path = screen.getByTestId('field-edge-orders-to-employees');
      expect(path).toHaveAttribute('id', 'orders-to-employees');
      expect(path).toHaveAttribute(
        'd',
        'M351.5 147L 366.5,147Q 371.5,147 371.5,152L 371.5,310Q 371.5,315 366.5,315L352.5 315L351.5 315',
      );
      // sense check that the line didn't become more complex
      const lines = path.getAttribute('d')?.split(/L\s*/);
      expect(lines?.length).toBeLessThanOrEqual(5);
    });
  });

  describe('With the nodes positioned above each other', () => {
    it('Should render edge', () => {
      mockNodes([
        {
          ...nodes[0],
          position: { x: 100, y: 100 },
        },
        {
          ...nodes[1],
          position: { x: 500, y: 100 },
        },
      ]);
      renderComponent();
      const path = screen.getByTestId('field-edge-orders-to-employees');
      expect(path).toHaveAttribute('id', 'orders-to-employees');
      expect(path).toHaveAttribute(
        'd',
        'M351.5 147L371.5 147L 417,147Q 422,147 422,152L 422,160Q 422,165 427,165L472.5 165L492.5 165',
      );
      // sense check that the line didn't become more complex
      const lines = path.getAttribute('d')?.split(/L\s*/);
      expect(lines?.length).toBeLessThanOrEqual(6);
    });
  });

  it('Should not render edge if source does not exist', () => {
    renderComponent({ source: 'unknown' });
    expect(screen.queryByTestId('field-edge-orders-to-employees')).not.toBeInTheDocument();
  });

  it('Should not render edge if target does not exist', () => {
    renderComponent({ target: 'unknown' });
    expect(screen.queryByTestId('field-edge-orders-to-employees')).not.toBeInTheDocument();
  });
});
