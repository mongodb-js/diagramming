import { render, screen } from '@/mocks/testing-utils';
import { ConnectionLine } from '@/components/line/connection-line';

describe('connection-line', () => {
  const renderComponent = () => {
    return render(<ConnectionLine fromX={100} fromY={100} toX={100} toY={100} />);
  };

  it('Should render line', () => {
    renderComponent();
    const path = screen.getByTestId('connection-line');
    expect(path).toHaveAttribute('d', 'M 100,100L 100,100');
  });
});
