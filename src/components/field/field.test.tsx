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
  onFieldNameChange,
  onFieldTypeChange,
  fieldTypes,
  ...fieldProps
}: React.ComponentProps<typeof FieldComponent> & {
  onAddFieldToObjectFieldClick?: () => void;
  onFieldNameChange?: (newName: string) => void;
  onFieldTypeChange?: (nodeId: string, fieldPath: string[], newType: string) => void;
  fieldTypes?: string[];
}) => {
  return (
    <EditableDiagramInteractionsProvider
      onAddFieldToObjectFieldClick={onAddFieldToObjectFieldClick}
      onFieldNameChange={onFieldNameChange}
      onFieldTypeChange={onFieldTypeChange}
      fieldTypes={fieldTypes}
    >
      <FieldComponent {...fieldProps} />
    </EditableDiagramInteractionsProvider>
  );
};

describe('field', () => {
  const DEFAULT_PROPS: ComponentProps<typeof Field> = {
    id: 'ordersId',
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

    it('Should allow field name editing an editable field', async () => {
      const onFieldNameChangeMock = vi.fn();

      const fieldId = ['ordersId'];
      const newFieldName = 'newFieldName';
      render(
        <FieldWithEditableInteractions
          {...DEFAULT_PROPS}
          id={fieldId}
          editable={true}
          onFieldNameChange={onFieldNameChangeMock}
        />,
      );
      const fieldName = screen.getByText('ordersId');
      expect(fieldName).toBeInTheDocument();
      await userEvent.dblClick(fieldName);
      const input = screen.getByDisplayValue('ordersId');
      expect(input).toBeInTheDocument();
      await userEvent.clear(input);
      await userEvent.type(input, newFieldName);
      expect(input).toHaveValue(newFieldName);
      expect(onFieldNameChangeMock).not.toHaveBeenCalled();
      await userEvent.type(input, '{enter}');
      expect(onFieldNameChangeMock).toHaveBeenCalledWith(DEFAULT_PROPS.nodeId, fieldId, newFieldName);
    });

    it('Should not allow field name editing if a field is not editable', async () => {
      const onFieldNameChangeMock = vi.fn();

      const fieldId = ['ordersId'];
      render(
        <FieldWithEditableInteractions
          {...DEFAULT_PROPS}
          id={fieldId}
          editable={false}
          onFieldNameChange={onFieldNameChangeMock}
        />,
      );
      const fieldName = screen.getByText('ordersId');
      expect(fieldName).toBeInTheDocument();
      await userEvent.dblClick(fieldName);
      expect(screen.queryByDisplayValue('ordersId')).not.toBeUndefined();
    });

    it('Should not allow editing if there is no callback', async () => {
      const fieldId = ['ordersId'];
      render(
        <FieldWithEditableInteractions {...DEFAULT_PROPS} id={fieldId} editable={true} onFieldNameChange={undefined} />,
      );
      const fieldName = screen.getByText('ordersId');
      expect(fieldName).toBeInTheDocument();
      await userEvent.dblClick(fieldName);
      expect(screen.queryByDisplayValue('ordersId')).not.toBeUndefined();
    });

    it('Should sync with prop changes', async () => {
      const originalName = 'originalName';
      const newName = 'newName';
      const { rerender } = render(
        <FieldWithEditableInteractions {...DEFAULT_PROPS} editable={true} name={originalName} />,
      );
      expect(screen.getByText(originalName)).toBeInTheDocument();
      await rerender(<FieldWithEditableInteractions {...DEFAULT_PROPS} editable={true} name={newName} />);
      expect(screen.getByText(newName)).toBeInTheDocument();
    });

    describe('Field type editing', () => {
      it('Should not allow editing when field is not selected', async () => {
        render(
          <FieldWithEditableInteractions
            {...DEFAULT_PROPS}
            id={['ordersId']}
            selected={false}
            variant="default"
            isHovering={true}
            editable={true}
            onFieldTypeChange={vi.fn()}
            fieldTypes={['string']}
          />,
        );
        expect(screen.queryByText('Select field type')).not.toBeInTheDocument();
      });
      it('Should not allow editing when field is disabled', async () => {
        render(
          <FieldWithEditableInteractions
            {...DEFAULT_PROPS}
            id={['ordersId']}
            selected={true}
            variant="disabled"
            isHovering={true}
            editable={true}
            onFieldTypeChange={vi.fn()}
            fieldTypes={['string']}
          />,
        );
        expect(screen.queryByText('Select field type')).not.toBeInTheDocument();
      });
      it('Should not allow editing when no callback is provided', async () => {
        render(
          <FieldWithEditableInteractions
            {...DEFAULT_PROPS}
            id={['ordersId']}
            selected={true}
            variant="default"
            isHovering={true}
            editable={true}
            fieldTypes={['string']}
          />,
        );
        expect(screen.queryByText('Select field type')).not.toBeInTheDocument();
      });
      it('Should not allow editing when no fieldTypes are provided', async () => {
        render(
          <FieldWithEditableInteractions
            {...DEFAULT_PROPS}
            id={['ordersId']}
            selected={true}
            variant="default"
            isHovering={true}
            editable={true}
            onFieldTypeChange={vi.fn()}
            fieldTypes={[]}
          />,
        );
        expect(screen.queryByText('Select field type')).not.toBeInTheDocument();
      });
      it('Should allow editing', async () => {
        const onFieldTypeChangeMock = vi.fn();
        render(
          <FieldWithEditableInteractions
            {...DEFAULT_PROPS}
            id={['ordersId']}
            selected={true}
            variant="default"
            isHovering={true}
            editable={true}
            onFieldTypeChange={onFieldTypeChangeMock}
            fieldTypes={['objectId', 'string', 'number']}
          />,
        );
        const caretWrapper = screen.getByLabelText('Select field type');
        expect(caretWrapper).toBeInTheDocument();
        await userEvent.click(caretWrapper);

        expect(onFieldTypeChangeMock).not.toHaveBeenCalled();
        const stringOption = screen.getByRole('option', { name: 'string' });
        await userEvent.click(stringOption);
        expect(onFieldTypeChangeMock).toHaveBeenCalledWith(
          DEFAULT_PROPS.nodeId,
          Array.isArray(DEFAULT_PROPS.id) ? DEFAULT_PROPS.id : [DEFAULT_PROPS.id],
          'string',
        );
        expect(onFieldTypeChangeMock).toHaveBeenCalledTimes(1);

        // Try changing to number type
        await userEvent.click(caretWrapper);
        const numberOption = screen.getByRole('option', { name: 'number' });
        await userEvent.click(numberOption);
        expect(onFieldTypeChangeMock).toHaveBeenCalledWith(
          DEFAULT_PROPS.nodeId,
          Array.isArray(DEFAULT_PROPS.id) ? DEFAULT_PROPS.id : [DEFAULT_PROPS.id],
          'number',
        );
        expect(onFieldTypeChangeMock).toHaveBeenCalledTimes(2);
      });
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
      const tooltipText = 'Multiple types: string, number, array';
      await screen.findByText(tooltipText);
      await userEvent.unhover(screen.getByText('(mixed)'));
      await waitFor(() => expect(screen.queryByText(tooltipText)).not.toBeInTheDocument());
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
