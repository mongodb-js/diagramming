import { Canvas } from '@/components/canvas/canvas';
import { render, screen } from '@/mocks/testing-utils';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import { ORDERS_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';

describe('canvas', () => {
  it('Should have elements on the canvas', () => {
    render(
      <Canvas title={'MongoDB Diagram'} nodes={[ORDERS_NODE, EMPLOYEES_NODE]} edges={[ORDERS_TO_EMPLOYEES_EDGE]} />,
    );
    expect(screen.getByRole('button', { name: /Plus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Minus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Full Screen/ })).toBeInTheDocument();
    expect(screen.getByText('100% MongoDB Diagram')).toBeInTheDocument();
    expect(screen.getByText('orders')).toBeInTheDocument();
    expect(screen.getByText('employees')).toBeInTheDocument();
  });
});
