import { Meta, StoryObj } from '@storybook/react';
import Icon from '@leafygreen-ui/icon';
import InlineDefinition from '@leafygreen-ui/inline-definition';

import { Diagram } from '@/components/diagram';
import { EMPLOYEE_TERRITORIES_NODE, EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
import {
  EMPLOYEES_TO_EMPLOYEE_TERRITORIES_EDGE,
  EMPLOYEES_TO_EMPLOYEES_EDGE,
  EMPLOYEES_TO_ORDERS_EDGE,
} from '@/mocks/datasets/edges';
import { DiagramStressTestDecorator } from '@/mocks/decorators/diagram-stress-test.decorator';
import { DiagramConnectableDecorator } from '@/mocks/decorators/diagram-connectable.decorator';
import { DiagramEditableInteractionsDecorator } from '@/mocks/decorators/diagram-editable-interactions.decorator';
import { DiagramEditableStressTestDecorator } from '@/mocks/decorators/diagram-editable-stress-test.decorator';

const diagram: Meta<typeof Diagram> = {
  title: 'Diagram',
  component: Diagram,
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [EMPLOYEES_TO_ORDERS_EDGE, EMPLOYEES_TO_EMPLOYEES_EDGE],
    nodes: [ORDERS_NODE, EMPLOYEES_NODE, EMPLOYEE_TERRITORIES_NODE],
  },
};

export default diagram;
type Story = StoryObj<typeof Diagram>;
export const BasicDiagram: Story = {};
export const DiagramWithFieldToFieldEdges: Story = {
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [
      { ...EMPLOYEES_TO_ORDERS_EDGE, sourceFieldIndex: 0, targetFieldIndex: 1 },
      { ...EMPLOYEES_TO_EMPLOYEE_TERRITORIES_EDGE, sourceFieldIndex: 0, targetFieldIndex: 1 },
    ],
    nodes: [
      { ...EMPLOYEE_TERRITORIES_NODE, position: { x: 100, y: 100 } },
      { ...ORDERS_NODE, position: { x: 500, y: 250 } },
      { ...EMPLOYEES_NODE, position: { x: 500, y: 100 } },
    ],
  },
};
export const DiagramWithConnectableNodes: Story = {
  decorators: [DiagramConnectableDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [
      { ...ORDERS_NODE, connectable: true },
      { ...EMPLOYEES_NODE, connectable: true },
    ],
  },
};

let idAccumulator: string[];
let lastDepth = 0;
// Used to build a string array id based on field depth.
function idFromDepthAccumulator(name: string, depth?: number) {
  if (!depth) {
    idAccumulator = [name];
  } else if (depth > lastDepth) {
    idAccumulator.push(name);
  } else if (depth === lastDepth) {
    idAccumulator[idAccumulator.length - 1] = name;
  } else {
    idAccumulator = idAccumulator.slice(0, depth);
    idAccumulator[depth] = name;
  }
  lastDepth = depth ?? 0;
  return [...idAccumulator];
}
export const DiagramWithEditInteractions: Story = {
  decorators: [DiagramEditableInteractionsDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [
      {
        ...ORDERS_NODE,
        fields: [
          ...ORDERS_NODE.fields.map(field => ({
            ...field,
            id: idFromDepthAccumulator(field.name, field.depth),
            selectable: true,
            editable: true,
          })),
        ],
      },
      {
        ...EMPLOYEES_NODE,
        fields: [
          ...EMPLOYEES_NODE.fields.map(field => ({
            ...field,
            id: idFromDepthAccumulator(field.name, field.depth),
            selectable: true,
            editable: true,
          })),
        ],
      },
    ],
  },
};

export const DiagramStressTest: Story = {
  decorators: [DiagramStressTestDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [],
  },
};

export const DiagramEditableStressTest: Story = {
  decorators: [DiagramEditableStressTestDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [],
    nodes: [],
  },
};

export const DiagramWithNodesOfVariousTitleLengths: Story = {
  decorators: [],
  args: {
    title: 'Diagram with Nodes of Various Title Lengths',
    isDarkMode: true,
    // to render add field button
    onAddFieldToNodeClick: () => {
      //
    },
    // to render expand/collapse button
    onNodeExpandToggle: () => {
      //
    },
    edges: [],
    nodes: [
      {
        id: 'node-1',
        title: 'Normal title',
        fields: [],
        position: { x: 100, y: 100 },
        type: 'collection',
      },
      {
        id: 'node-2',
        title: (
          <span
            style={{
              overflowWrap: 'break-word',
              minWidth: 0,
            }}
          >
            This is a node with a very long title that should not be truncated or overflow the node boundaries
          </span>
        ),
        fields: [],
        position: { x: 400, y: 100 },
        type: 'collection',
      },
      {
        id: 'node-3',
        title: (
          <span
            style={{
              overflowWrap: 'break-word',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            This is a node with a very long title that should be truncated with an ellipsis if it exceeds the node width
          </span>
        ),
        fields: [],
        position: { x: 100, y: 300 },
        type: 'collection',
      },
      {
        id: 'node-4',
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, minWidth: 0 }}>
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              This title is a JSX element with <strong>bold</strong> text and <em>italic</em> text
            </span>
            <InlineDefinition definition={'This is an inline definition tooltip for the node title.'}>
              <div style={{ color: 'yellow', display: 'flex' }}>
                <Icon glyph="Warning" />
              </div>
            </InlineDefinition>
          </div>
        ),
        fields: [],
        position: { x: 400, y: 300 },
        type: 'collection',
      },
    ],
  },
};
