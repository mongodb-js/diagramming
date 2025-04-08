import { palette } from '@leafygreen-ui/palette';

import { render, screen } from '@/mocks/testing-utils';
import { Field } from '@/components/field/field';

describe('field', () => {
  it('Should have field', () => {
    render(
      <Field
        name={'ordersId'}
        type={'objectId'}
        glyphs={['key', 'link']}
        accent={palette.blue.base}
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
