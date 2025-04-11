import { NodeField } from '@/types';

/**
 * Computes the lengths of consecutive groups of fields with the variant 'preview'.
 * Each group is keyed by the `name` of its first field.
 */
export const getPreviewGroupLengths = (fields: Array<NodeField>) => {
  const borderLength: Record<string, number> = {};
  let currentGroup: string[] = [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (field.variant === 'preview') {
      currentGroup.push(field.name);
    } else {
      if (currentGroup.length > 0) {
        borderLength[currentGroup[0]] = currentGroup.length;
        currentGroup = [];
      }
    }
  }

  if (currentGroup.length > 0) {
    borderLength[currentGroup[0]] = currentGroup.length;
  }

  return borderLength;
};
