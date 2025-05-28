import { palette } from '@leafygreen-ui/palette';
import { ComponentProps } from 'react';

import { render, screen } from '@/mocks/testing-utils';
import { Field } from '@/components/field/field';
import { DEFAULT_PREVIEW_GROUP_AREA } from '@/utilities/get-preview-group-area';

describe('field', () => {
  const DEFAULT_PROPS: ComponentProps<typeof Field> = {
    nodeType: 'collection',
    name: 'ordersId',
    type: 'objectId',
    glyphs: ['key', 'link'],
    previewGroupArea: DEFAULT_PREVIEW_GROUP_AREA,
    spacing: 2,
    depth: 1,
  };
  it('Should have field', () => {
    render(<Field {...DEFAULT_PROPS} />);
    expect(screen.getByText('ordersId')).toBeInTheDocument();
    expect(screen.getByText('objectId')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Key Icon' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Link Icon' })).toBeInTheDocument();
  });
  describe('With glyphs', () => {
    it('With disabled', () => {
      render(<Field {...DEFAULT_PROPS} variant={'disabled'} />);
      expect(screen.getByRole('img', { name: 'Key Icon' })).toHaveAttribute('color', '#889397');
      expect(screen.getByRole('img', { name: 'Link Icon' })).toHaveAttribute('color', '#889397');
    });
    it('With primary', () => {
      render(<Field {...DEFAULT_PROPS} variant={'primary'} />);
      expect(screen.getByRole('img', { name: 'Key Icon' })).toHaveAttribute('color', palette.blue.base);
      expect(screen.getByRole('img', { name: 'Link Icon' })).toHaveAttribute('color', palette.gray.dark1);
    });
    it('With collection type', () => {
      render(<Field {...DEFAULT_PROPS} />);
      expect(screen.getByRole('img', { name: 'Key Icon' })).toHaveAttribute('color', palette.green.dark1);
      expect(screen.getByRole('img', { name: 'Link Icon' })).toHaveAttribute('color', palette.gray.dark1);
    });
    it('With table type', () => {
      render(<Field {...DEFAULT_PROPS} nodeType={'table'} />);
      expect(screen.getByRole('img', { name: 'Key Icon' })).toHaveAttribute('color', palette.purple.base);
      expect(screen.getByRole('img', { name: 'Link Icon' })).toHaveAttribute('color', palette.gray.dark1);
    });
  });
});
