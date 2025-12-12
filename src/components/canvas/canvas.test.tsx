import userEvent from '@testing-library/user-event';

import { Canvas } from '@/components/canvas/canvas';
import { render, screen } from '@/mocks/testing-utils';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { EMPLOYEES_TO_ORDERS_EDGE } from '@/mocks/datasets/edges';

describe('canvas', () => {
  it('Should have elements on the canvas', () => {
    render(
      <Canvas title={'MongoDB Diagram'} nodes={[ORDERS_NODE, EMPLOYEES_NODE]} edges={[EMPLOYEES_TO_ORDERS_EDGE]} />,
    );
    expect(screen.getByRole('button', { name: /Plus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Minus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Full Screen/ })).toBeInTheDocument();
    expect(screen.getByText('100% MongoDB Diagram')).toBeInTheDocument();
    expect(screen.getByText('orders')).toBeInTheDocument();
    expect(screen.getByText('employees')).toBeInTheDocument();
  });

  describe('callbacks', () => {
    it('Should call onNodeContextMenu when a node is right-clicked', async () => {
      const onNodeContextMenu = vi.fn();
      render(
        <Canvas
          title={'MongoDB Diagram'}
          nodes={[ORDERS_NODE, EMPLOYEES_NODE]}
          edges={[EMPLOYEES_TO_ORDERS_EDGE]}
          onNodeContextMenu={onNodeContextMenu}
        />,
      );
      const orders = screen.getByText('orders');
      await userEvent.pointer({ target: orders, keys: '[MouseRight]' });
      expect(onNodeContextMenu).toHaveBeenCalledTimes(1);
      expect(onNodeContextMenu.mock.calls[0][1]).toMatchObject(ORDERS_NODE);
    });

    // Disabled because the drag simulation is not working. Leaving this here in case someone figures it out.
    // Tests for onNodeDragStop and onSelectionDragStop should be added as well.
    it.skip('Should call onNodeDrag when a node is being dragged', async () => {
      const onNodeDrag = vi.fn();
      render(
        <Canvas
          title={'MongoDB Diagram'}
          nodes={[ORDERS_NODE, EMPLOYEES_NODE]}
          edges={[EMPLOYEES_TO_ORDERS_EDGE]}
          onNodeDrag={onNodeDrag}
        />,
      );
      const orders = screen.getByText('orders');
      const rect = orders.getBoundingClientRect();
      await userEvent.pointer([
        { target: orders, keys: '[MouseLeft>]' },
        { coords: { x: rect.x + 12, y: rect.y + 12 } },
        { keys: '[/MouseLeft]' },
      ]);
      expect(onNodeDrag).toHaveBeenCalledTimes(1);
      const { position: _position, ...nodeWithoutPosition } = ORDERS_NODE;
      expect(onNodeDrag.mock.calls[0][1]).toMatchObject(nodeWithoutPosition);
    });

    it('Should call onNodeClick when a node is clicked', async () => {
      const onNodeClick = vi.fn();
      render(
        <Canvas
          title={'MongoDB Diagram'}
          nodes={[ORDERS_NODE, EMPLOYEES_NODE]}
          edges={[EMPLOYEES_TO_ORDERS_EDGE]}
          onNodeClick={onNodeClick}
        />,
      );
      const orders = screen.getByText('orders');
      await orders.click();
      expect(onNodeClick).toHaveBeenCalledTimes(1);
      expect(onNodeClick.mock.calls[0][1]).toMatchObject(ORDERS_NODE);
    });

    it('Should call onSelectionChange when different nodes are clicked', async () => {
      const onSelectionChange = vi.fn();
      render(
        <Canvas
          title={'MongoDB Diagram'}
          nodes={[ORDERS_NODE, EMPLOYEES_NODE]}
          edges={[EMPLOYEES_TO_ORDERS_EDGE]}
          onSelectionChange={onSelectionChange}
        />,
      );
      await screen.getByText('orders').click();
      await screen.getByText('employees').click();
      await screen.getByText('employees').click(); // for unknown reason there needs to be an extra click in the test
      expect(onSelectionChange.mock.calls[0][0]).toMatchObject({ nodes: [] });
      expect(onSelectionChange.mock.calls[1][0]).toMatchObject({ nodes: [ORDERS_NODE] });
      expect(onSelectionChange.mock.calls[2][0]).toMatchObject({ nodes: [EMPLOYEES_NODE] });
    });
  });
});
