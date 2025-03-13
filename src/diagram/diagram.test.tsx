import { Diagram } from '@/diagram/diagram';
import { render, screen } from '@testing-library/react';

describe('Diagram', () => {
  it('Should render diagram', () => {
    render(<Diagram />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
