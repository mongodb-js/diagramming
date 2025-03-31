import { Diagram } from '@/components/diagram';
import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';

describe('Diagram', () => {
  it('Should render diagram', () => {
    render(
      <ReactFlowProvider>
        <Diagram title={'MongoDB Diagram'} nodes={[]} edges={[]} />
      </ReactFlowProvider>,
    );
    expect(screen.getByTitle('MongoDB Diagram')).toBeInTheDocument();
  });
});
