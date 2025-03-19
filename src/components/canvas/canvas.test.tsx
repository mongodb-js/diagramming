import { Canvas } from '@/components/canvas/canvas';
import { render, screen } from '@/mocks/testing-utils';

describe('canvas', () => {
  it('Should have elements on the canvas', () => {
    render(<Canvas title={'MongoDB Diagram'} />);
    expect(screen.getByRole('button', { name: /Plus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Minus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Full Screen/ })).toBeInTheDocument();
    expect(screen.getByText('100% MongoDB Diagram')).toBeInTheDocument();
  });
});
