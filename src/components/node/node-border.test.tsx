import React, { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { palette } from '@leafygreen-ui/palette';

import { NodeBorder } from '@/components/node/node-border';

describe('node-border', () => {
  const renderComponent = (props?: Partial<ComponentProps<typeof NodeBorder>>) =>
    render(<NodeBorder {...props}>child</NodeBorder>);

  it('Should render children', () => {
    renderComponent({});
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('Should have animated preview border', () => {
    renderComponent({ variant: 'preview' });
    const result = screen.getByText('child');
    expect(getComputedStyle(result).animation).not.toBeEmpty();
  });

  it('Should have subtle border', () => {
    renderComponent({ variant: 'subtle' });
    const result = screen.getByText('child');
    expect(getComputedStyle(result).outline).toEqual(`2px solid ${palette.gray.base}`);
  });

  it('Should have selected border', () => {
    renderComponent({ variant: 'selected' });
    const result = screen.getByText('child');
    expect(getComputedStyle(result).outline).toEqual(`2px solid ${palette.blue.base}`);
  });

  it('With no border', () => {
    renderComponent({});
    const result = screen.getByText('child');
    expect(getComputedStyle(result).outline).toEqual('none');
  });
});
