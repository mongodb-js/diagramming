import { render, screen, within } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';

import { Diagram } from '@/components/diagram';
import { EMPLOYEES_NODE } from '@/mocks/datasets/nodes';
import { EMPLOYEES_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';
import { NodeProps } from '@/types';

describe('Diagram', () => {
  it('Should render diagram', () => {
    render(
      <ReactFlowProvider>
        <Diagram title={'MongoDB Diagram'} nodes={[EMPLOYEES_NODE]} edges={[EMPLOYEES_TO_EMPLOYEES_EDGE]} />
      </ReactFlowProvider>,
    );
    const controls = screen.getByTestId('rf__controls');
    expect(within(controls).getByRole('button', { name: /Plus/ })).toBeInTheDocument();
    expect(within(controls).getByRole('button', { name: /Minus/ })).toBeInTheDocument();
    expect(within(controls).getByRole('button', { name: /Full Screen/ })).toBeInTheDocument();
    expect(screen.getByTestId('rf__minimap')).toBeInTheDocument();
    expect(screen.getByTestId('rf__node-employees')).toBeInTheDocument();
  });

  it('Should correctly add / remove fields in the node on update', () => {
    const nodeWithFields: NodeProps = {
      id: 'node-1',
      title: 'Node 1',
      position: { x: 0, y: 0 },
      type: 'collection',
      fields: [{ name: 'field-a' }, { name: 'field-b' }, { name: 'field-c' }],
    };

    // Render all fields first
    const { rerender } = render(
      <ReactFlowProvider>
        <Diagram nodes={[nodeWithFields]} edges={[]} />
      </ReactFlowProvider>,
    );

    expect(screen.getByText('field-a')).toBeInTheDocument();
    expect(screen.getByText('field-b')).toBeInTheDocument();
    expect(screen.getByText('field-c')).toBeInTheDocument();

    // Add a field in the middle of the list
    const nodeWithFieldAdded = {
      ...nodeWithFields,
      fields: [nodeWithFields.fields[0], { name: 'field-after-a' }, nodeWithFields.fields[1], nodeWithFields.fields[2]],
    };

    rerender(
      <ReactFlowProvider>
        <Diagram nodes={[nodeWithFieldAdded]} edges={[]} />
      </ReactFlowProvider>,
    );

    expect(screen.getByText('field-a')).toBeInTheDocument();
    expect(screen.getByText('field-after-a')).toBeInTheDocument();
    expect(screen.getByText('field-b')).toBeInTheDocument();
    expect(screen.getByText('field-c')).toBeInTheDocument();

    // Remove the field from the middle of the list
    const nodeWithFieldRemoved = {
      ...nodeWithFields,
      fields: [nodeWithFields.fields[0], nodeWithFields.fields[2]],
    };

    rerender(
      <ReactFlowProvider>
        <Diagram nodes={[nodeWithFieldRemoved]} edges={[]} />
      </ReactFlowProvider>,
    );

    expect(screen.getByText('field-a')).toBeInTheDocument();
    expect(screen.getByText('field-c')).toBeInTheDocument();
    expect(() => screen.getByText('field-after-a')).toThrow();
    expect(() => screen.getByText('field-b')).toThrow();
  });
});
