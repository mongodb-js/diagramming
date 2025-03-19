import { Diagram } from '@/diagram/diagram';
import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';

describe('Diagram', () => {
  it('Should render diagram', () => {
    render(
      <ReactFlowProvider>
        <Diagram title={'MongoDB Diagram'} />
      </ReactFlowProvider>,
    );
    expect(screen.getByTitle('MongoDB Diagram')).toBeInTheDocument();
  });
});
