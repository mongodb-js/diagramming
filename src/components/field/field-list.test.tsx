import { userEvent } from '@testing-library/user-event';

import { render, screen } from '@/mocks/testing-utils';
import { FieldList as FieldListComponent } from '@/components/field/field-list';
import { EditableDiagramInteractionsProvider } from '@/hooks/use-editable-diagram-interactions';

const FieldWithEditableInteractions = ({
  onAddFieldToObjectFieldClick,
  onFieldNameChange,
  onFieldClick,
  onFieldExpandToggle,
  ...props
}: Partial<React.ComponentProps<typeof FieldListComponent>> & {
  onAddFieldToObjectFieldClick?: () => void;
  onFieldNameChange?: (newName: string) => void;
  onFieldClick?: () => void;
  onFieldExpandToggle?: () => void;
}) => {
  return (
    <EditableDiagramInteractionsProvider
      onFieldClick={onFieldClick}
      onAddFieldToObjectFieldClick={onAddFieldToObjectFieldClick}
      onFieldNameChange={onFieldNameChange}
      onFieldExpandToggle={onFieldExpandToggle}
    >
      <FieldListComponent nodeType="collection" nodeId="coll" fields={[]} {...props} />
    </EditableDiagramInteractionsProvider>
  );
};

describe('field-list', () => {
  it('Should call field click callback with field id (and fallback to name when id missing)', async () => {
    const onFieldClick = vi.fn();
    render(
      <FieldWithEditableInteractions
        onFieldClick={onFieldClick}
        fields={[
          { name: 'field-with-just-name', selectable: true, hasChildren: false },
          { id: ['field', 'with', 'id'], name: 'and-custom-name', selectable: true, hasChildren: false },
        ]}
      />,
    );
    expect(screen.getByText('field-with-just-name')).toBeInTheDocument();
    expect(screen.getByText('and-custom-name')).toBeInTheDocument();

    await userEvent.click(screen.getByText('field-with-just-name'));
    expect(onFieldClick).toHaveBeenCalledTimes(1);
    expect(onFieldClick.mock.lastCall?.[1]).toEqual({
      id: 'field-with-just-name',
      nodeId: 'coll',
    });

    await userEvent.click(screen.getByText('and-custom-name'));
    expect(onFieldClick).toHaveBeenCalledTimes(2);
    expect(onFieldClick.mock.lastCall?.[1]).toEqual({
      id: ['field', 'with', 'id'],
      nodeId: 'coll',
    });
  });

  it('should ensure that items that are hasChildren have the toggle', () => {
    const onFieldExpandToggle = vi.fn();
    render(
      <FieldWithEditableInteractions
        onFieldExpandToggle={onFieldExpandToggle}
        fields={[
          { id: ['other'], name: 'other', hasChildren: false },
          { id: ['parent'], name: 'parent', expanded: true, hasChildren: true },
          { id: ['parent', 'child1'], name: 'child1', depth: 1, hasChildren: false },
          { id: ['parent', 'child2'], name: 'child2', depth: 1, hasChildren: false },
        ]}
      />,
    );
    expect(screen.queryByTestId('field-expand-toggle-coll-other')).not.toBeInTheDocument();
    expect(screen.getByTestId('field-expand-toggle-coll-parent')).toBeInTheDocument();
    expect(screen.queryByTestId('field-expand-toggle-coll-parent-child1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('field-expand-toggle-coll-parent-child2')).not.toBeInTheDocument();
  });
});
