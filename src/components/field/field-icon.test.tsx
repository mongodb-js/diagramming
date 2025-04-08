import { render, screen } from '@/mocks/testing-utils';
import { FieldIcon } from '@/components/field/field-icon';

describe('field-icon', () => {
  it('Should have key', () => {
    render(<FieldIcon primaryColor={'#000'} glyph={'key'} />);
    expect(screen.getByRole('img', { name: 'Key Icon' })).toBeInTheDocument();
  });
  it('Should have link', () => {
    render(<FieldIcon primaryColor={'#000'} glyph={'link'} />);
    expect(screen.getByRole('img', { name: 'Link Icon' })).toBeInTheDocument();
  });
});
