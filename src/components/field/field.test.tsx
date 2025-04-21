import { render, screen } from '@/mocks/testing-utils';
import { Field } from '@/components/field/field';

describe('field', () => {
  it('Should have field', () => {
    render(
      <Field
        nodeType={'collection'}
        name={'ordersId'}
        type={'objectId'}
        glyphs={['key', 'link']}
        spacing={2}
        depth={1}
      />,
    );
    expect(screen.getByText('ordersId')).toBeInTheDocument();
    expect(screen.getByText('objectId')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Key Icon' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Link Icon' })).toBeInTheDocument();
  });
});
