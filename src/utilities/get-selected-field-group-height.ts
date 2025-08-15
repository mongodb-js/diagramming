import { NodeField } from '@/types';

const DEFAULT_SELECTED_FIELD_GROUP_HEIGHT = 0;

export const getSelectedId = (id: number, name: string) => {
  return `${id}.${name}`;
};

/**
 * Computes the height of consecutive groups of fields that are selected.
 * The height is denoted by the number of consecutive fields.
 * A selected field containing a number of other fields will have the height
 * of all of the contained fields.
 */
export const getSelectedFieldGroupHeight = (fields: NodeField[]) => {
  let currentHeight = DEFAULT_SELECTED_FIELD_GROUP_HEIGHT;
  let name = undefined;
  let depth = 0;

  const selectedHeight: Record<string, number> = {};

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (field.selected) {
      if (!name) {
        name = getSelectedId(i, field.name);
        depth = field.depth || 0;
      }
      currentHeight = currentHeight + 1;
    } else {
      if (currentHeight > 0 && name) {
        if (!field.depth || field.depth <= depth) {
          selectedHeight[name] = currentHeight;
          currentHeight = DEFAULT_SELECTED_FIELD_GROUP_HEIGHT;
          name = undefined;
        } else {
          // If the next field is nested, we continue counting.
          currentHeight += 1;
        }
      }
    }
  }

  if (currentHeight > 0 && name) {
    selectedHeight[name] = currentHeight;
  }

  return selectedHeight;
};
