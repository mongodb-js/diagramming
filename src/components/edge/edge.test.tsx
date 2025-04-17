import { render, screen } from '@/mocks/testing-utils';
import { Edge } from '@/components/edge/edge';

describe('edge', () => {
  it('Should have selected edge', () => {
    render(
      <Edge
        data-testid={'edge'}
        path={'M0,0 L100,100'}
        markerStart={"url('#start-one')"}
        markerEnd={"url('#end-one')"}
        selected={true}
      />,
    );
    const edge = screen.getByTestId('edge');
    expect(edge).toHaveAttribute('marker-start', "url('#start-one-selected')");
    expect(edge).toHaveAttribute('marker-end', "url('#end-one-selected')");
  });
  it('Should not have selected edge', () => {
    render(
      <Edge
        data-testid={'edge'}
        path={'M0,0 L100,100'}
        markerStart={"url('#start-one')"}
        markerEnd={"url('#end-one')"}
      />,
    );
    const edge = screen.getByTestId('edge');
    expect(edge).toHaveAttribute('marker-start', "url('#start-one')");
    expect(edge).toHaveAttribute('marker-end', "url('#end-one')");
  });
});
