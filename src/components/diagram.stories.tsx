import { Meta, StoryObj } from '@storybook/react';

import { Diagram } from '@/components/diagram';
import { CUSTOMERS_NODE, EMPLOYEE_TERRITORIES_NODE, EMPLOYEES_NODE, ORDERS_NODE } from '@/mocks/datasets/nodes';
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
      { ...EMPLOYEES_TO_ORDERS_EDGE, sourceFieldId: ['address', 'city'], targetFieldId: ['SUPPLIER_ID'] },
      {
        ...EMPLOYEES_TO_EMPLOYEE_TERRITORIES_EDGE,
        sourceFieldId: ['employeeId'],
        targetFieldId: ['employeeId'],
      },
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

export const DiagramWithEditInteractions: Story = {
  decorators: [DiagramEditableInteractionsDecorator],
  args: {
    title: 'MongoDB Diagram',
    isDarkMode: true,
    edges: [
      {
        ...EMPLOYEES_TO_ORDERS_EDGE,
        sourceFieldId: ['employeeId'],
        targetFieldId: ['SUPPLIER_ID'],
      },
    ],
    nodes: [
      {
        ...ORDERS_NODE,
        fields: [
          ...ORDERS_NODE.fields.map(field => ({
            ...field,
            selectable: true,
            editable: true,
          })),
        ],
        variant: {
          type: 'warn',
          warnMessage: 'This is a warning message for the Orders node.',
        },
      },
      {
        ...EMPLOYEES_NODE,
        fields: [
          ...EMPLOYEES_NODE.fields.map(field => ({
            ...field,
            selectable: true,
            editable: true,
          })),
        ],
      },
      {
        ...CUSTOMERS_NODE,
        fields: [
          ...CUSTOMERS_NODE.fields.map(field => ({
            ...field,
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
