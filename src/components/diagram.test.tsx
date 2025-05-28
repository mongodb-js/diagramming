import { render, screen, within } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';

import { Diagram } from '@/components/diagram';
import { EMPLOYEES_NODE } from '@/mocks/datasets/nodes';
import { EMPLOYEES_TO_EMPLOYEES_EDGE } from '@/mocks/datasets/edges';

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
});
