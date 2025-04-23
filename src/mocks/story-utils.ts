import { NodeFieldVariant, Node } from '@/types';

export const setFieldVariantsForNodes = (nodes: Node[], variant?: NodeFieldVariant) => {
  const allowableVariants: NodeFieldVariant[] = ['primary', 'disabled'];
  return nodes.map(node => ({
    ...node,
    fields: node.fields.map(field => ({
      ...field,
      variant: variant || allowableVariants[Math.floor(Math.random() * 2) + 1],
    })),
  }));
};
