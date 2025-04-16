import { render, screen } from '@/mocks/testing-utils';
import { Marker } from '@/components/markers/marker';

describe('marker', () => {
  it('Should render marker', () => {
    render(<Marker id={'orders-to-employees'} data-testid={'marker'} orient={'auto'} fill={'#FFF'} />);
    const marker = screen.getByTestId('marker');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('markerHeight', '15');
    expect(marker).toHaveAttribute('markerWidth', '15');
    expect(marker).toHaveAttribute('refX', '7.5');
    expect(marker).toHaveAttribute('refY', '7.5');
    expect(marker).toHaveAttribute('orient', 'auto');
    expect(marker).toHaveAttribute('fill', '#FFF');
  });
});
