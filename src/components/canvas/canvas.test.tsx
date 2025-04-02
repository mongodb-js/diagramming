import { Canvas } from '@/components/canvas/canvas';
import { render, screen } from '@/mocks/testing-utils';
import { EMPLOYEES_NODE, ORDERS_NODE } from '@/components/datasets/nodes';

describe('canvas', () => {
  it('Should have elements on the canvas', () => {
    render(<Canvas title={'MongoDB Diagram'} nodes={[ORDERS_NODE, EMPLOYEES_NODE]} />);
    expect(screen.getByRole('button', { name: /Plus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Minus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Full Screen/ })).toBeInTheDocument();
    expect(screen.getByText('100% MongoDB Diagram')).toBeInTheDocument();
    expect(screen.getByText('orders')).toBeInTheDocument();
    expect(screen.getByText('employees')).toBeInTheDocument();
  });
});
