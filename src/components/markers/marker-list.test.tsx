import { render, screen } from '@/mocks/testing-utils';
import { MarkerList } from '@/components/markers/marker-list';

describe('marker-list', () => {
  it('Should have markers', () => {
    render(<MarkerList />);
    expect(screen.getByTestId('start-many')).toBeInTheDocument();
    expect(screen.getByTestId('start-one')).toBeInTheDocument();
    expect(screen.getByTestId('start-oneOrMany')).toBeInTheDocument();
    expect(screen.getByTestId('end-many')).toBeInTheDocument();
    expect(screen.getByTestId('end-one')).toBeInTheDocument();
    expect(screen.getByTestId('end-oneOrMany')).toBeInTheDocument();
  });
});
