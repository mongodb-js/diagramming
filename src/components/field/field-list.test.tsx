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
          { name: 'field-with-just-name', selectable: true },
          { id: ['field', 'with', 'id'], name: 'and-custom-name', selectable: true },
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

  it('should filter out children of collapsed fields', () => {
    render(
      <FieldWithEditableInteractions
        fields={[
          { id: ['expandedParent'], name: 'expandedParent', expanded: true },
          { id: ['expandedParent', 'child1'], name: 'visibleChild1', depth: 1 },
          { id: ['expandedParent', 'child2'], name: 'visibleChild2', depth: 1 },
          { id: ['collapsedParent'], name: 'collapsedParent', expanded: false },
          { id: ['collapsedParent', 'child1'], name: 'invisibleChild1', depth: 1 },
          { id: ['collapsedParent', 'child2'], name: 'invisibleChild2', depth: 1 },
          { id: ['other'], name: 'other' },
        ]}
      />,
    );
    expect(screen.getByText('expandedParent')).toBeInTheDocument();
    expect(screen.getByText('visibleChild1')).toBeInTheDocument();
    expect(screen.getByText('visibleChild2')).toBeInTheDocument();
    expect(screen.getByText('collapsedParent')).toBeInTheDocument();
    expect(screen.queryByText('invisibleChild1')).not.toBeInTheDocument();
    expect(screen.queryByText('invisibleChild2')).not.toBeInTheDocument();
    expect(screen.getByText('other')).toBeInTheDocument();
  });

  it('should ensure that items that do have children are collapsible', () => {
    const onFieldExpandToggle = vi.fn();
    render(
      <FieldWithEditableInteractions
        onFieldExpandToggle={onFieldExpandToggle}
        fields={[
          { id: ['other'], name: 'other' },
          { id: ['parent'], name: 'parent', expanded: true },
          { id: ['parent', 'child1'], name: 'child1', depth: 1 },
          { id: ['parent', 'child2'], name: 'child2', depth: 1 },
        ]}
      />,
    );
    expect(screen.queryByTestId('field-expand-toggle-coll-other')).not.toBeInTheDocument();
    expect(screen.getByTestId('field-expand-toggle-coll-parent')).toBeInTheDocument();
    expect(screen.queryByTestId('field-expand-toggle-coll-parent-child1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('field-expand-toggle-coll-parent-child2')).not.toBeInTheDocument();
  });
});
