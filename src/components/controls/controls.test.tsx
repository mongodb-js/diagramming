import { screen } from '@testing-library/react';

import { Controls } from '@/components/controls/controls';
import { render } from '@/mocks/testing-utils';

describe('controls', () => {
  it('Should have buttons', () => {
    render(<Controls />);
    expect(screen.getByRole('button', { name: /Plus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Minus/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Full Screen/ })).toBeInTheDocument();
  });
  it('Should not have title', () => {
    render(<Controls />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
  it('Should have title', () => {
    render(<Controls title={'MongoDB Diagram'} />);
    expect(screen.getByText('100% MongoDB Diagram')).toBeInTheDocument();
  });
});
