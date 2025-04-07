import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { LIGHT_THEME } from '@/styles/theme-light';
import { InternalNode } from '@/types/internal';
import { DARK_THEME } from '@/styles/theme-dark';
import { Node } from '@/components/node/node';

const INTERNAL_NODE: InternalNode = {
  id: 'orders',
  type: 'collection',
  position: { x: 100, y: 100 },
  data: { title: 'orders', fields: [{ name: 'one' }] },
};

const nodeStory: Meta<typeof Node> = {
  title: 'Node',
  component: Node,
  parameters: {
    docs: {
      theme: LIGHT_THEME,
    },
  },
  decorators: [
    Story => <Story />,
    withThemeFromJSXProvider<Renderer>({
      themes: {
        light: LIGHT_THEME,
        dark: DARK_THEME,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
    }),
  ],
};

type Story = StoryObj<typeof Node>;

export const CollectionType: Story = { args: INTERNAL_NODE };

export const RelationalType: Story = {
  args: { ...INTERNAL_NODE, type: 'table' },
};
export const ConnectableType: Story = {
  args: { ...INTERNAL_NODE, type: 'connectable' },
};

export default nodeStory;
