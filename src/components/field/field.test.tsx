import { palette } from '@leafygreen-ui/palette';
import { ComponentProps } from 'react';
import { userEvent } from '@testing-library/user-event';

import { render, screen, waitFor } from '@/mocks/testing-utils';
import { Field as FieldComponent } from '@/components/field/field';
import { DEFAULT_PREVIEW_GROUP_AREA } from '@/utilities/get-preview-group-area';
import { EditableDiagramInteractionsProvider } from '@/hooks/use-editable-diagram-interactions';

const Field = (props: React.ComponentProps<typeof FieldComponent>) => (
  <EditableDiagramInteractionsProvider>
    <FieldComponent {...props} />
  </EditableDiagramInteractionsProvider>
);

const FieldWithEditableInteractions = ({
  onAddFieldToObjectFieldClick,
  ...fieldProps
}: React.ComponentProps<typeof FieldComponent> & {
  onAddFieldToObjectFieldClick?: () => void;
}) => {
  return (
    <EditableDiagramInteractionsProvider onAddFieldToObjectFieldClick={onAddFieldToObjectFieldClick}>
      <FieldComponent {...fieldProps} />
    </EditableDiagramInteractionsProvider>
  );
};

describe('field', () => {
  const DEFAULT_PROPS: ComponentProps<typeof Field> = {
    nodeType: 'collection',
    name: 'ordersId',
    nodeId: 'pineapple',
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
  it('Should not have a button to add a field on an object type', () => {
    render(<Field {...DEFAULT_PROPS} type={'object'} id={['ordersId']} />);
    expect(screen.getByText('ordersId')).toBeInTheDocument();
    expect(screen.getByText('{}')).toBeInTheDocument();
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
  describe('With editable interactions supplied', () => {
    it('Should have a button to add a field on an object type', async () => {
      const onAddFieldToObjectFieldClickMock = vi.fn();

      render(
        <FieldWithEditableInteractions
          {...DEFAULT_PROPS}
          type={'object'}
          id={['ordersId']}
          onAddFieldToObjectFieldClick={onAddFieldToObjectFieldClickMock}
        />,
      );
      expect(screen.getByText('ordersId')).toBeInTheDocument();
      expect(screen.getByText('{}')).toBeInTheDocument();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-testid', 'object-field-type-pineapple-ordersId');
      expect(button).toHaveAttribute('title', 'Add Field');
      expect(onAddFieldToObjectFieldClickMock).not.toHaveBeenCalled();
      await userEvent.click(button);
      expect(onAddFieldToObjectFieldClickMock).toHaveBeenCalled();
    });

    it('Should not have a button to add a field with non-object types', () => {
      render(<FieldWithEditableInteractions {...DEFAULT_PROPS} id={['ordersId']} />);
      expect(screen.getByText('ordersId')).toBeInTheDocument();
      expect(screen.getByText('objectId')).toBeInTheDocument();
      const button = screen.queryByRole('button');
      expect(button).not.toBeInTheDocument();
    });
  });
  describe('With specific types', () => {
    it('shows [] with "array"', () => {
      render(<Field {...DEFAULT_PROPS} type="array" />);
      expect(screen.getByText('[]')).toBeInTheDocument();
      expect(screen.queryByText('array')).not.toBeInTheDocument();
    });

    it('shows (mixed) with multiple types with a tooltip with more info', async () => {
      render(<Field {...DEFAULT_PROPS} type={['string', 'number', 'array']} />);
      expect(screen.getByText('(mixed)')).toBeInTheDocument();
      expect(screen.queryByText('string')).not.toBeInTheDocument();

      // When hovering the (mixed) text, the tooltip content is present in the document.
      await userEvent.hover(screen.getByText('(mixed)'));
      await screen.findByText('Multiple types found in sample: string, number, array');
      await userEvent.unhover(screen.getByText('(mixed)'));
      await waitFor(() =>
        expect(screen.queryByText('Multiple types found in sample: string, number, array')).not.toBeInTheDocument(),
      );
    });

    it('shows type when a single type in an array is provided', () => {
      render(<Field {...DEFAULT_PROPS} type={['string']} />);
      expect(screen.getByText('string')).toBeInTheDocument();
      expect(screen.queryByText('(mixed)')).not.toBeInTheDocument();
    });

    it('shows unknown when an empty array type is provided', () => {
      render(<Field {...DEFAULT_PROPS} type={[]} />);
      expect(screen.getByText('unknown')).toBeInTheDocument();
      expect(screen.queryByText('(mixed)')).not.toBeInTheDocument();
    });
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
