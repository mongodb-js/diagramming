import { NodeField } from '@/types';
import { stringArrayCompare } from '@/utilities/string-array-compare';

const DEFAULT_SELECTED_FIELD_GROUP_HEIGHT = 0;

export const getSelectedId = (id: number, name: string) => {
  return `${id}.${name}`;
};

// Constant for performance optimization.
const NO_SELECTED_FIELDS = {};

/**
 * Computes the height of consecutive groups of fields that are selected.
 * The height is denoted by the number of consecutive fields.
 * A selected field containing a number of other fields will have the height
 * of all of the contained fields.
 */
export const getSelectedFieldGroupHeight = (
  fields: NodeField[],
  selectedFields: string[][],
): Record<string, number> => {
  let currentHeight = DEFAULT_SELECTED_FIELD_GROUP_HEIGHT;
  let name = undefined;
  let depth = 0;

  const selectedHeight: Record<string, number> = {};

  if (selectedFields.length === 0) {
    return NO_SELECTED_FIELDS;
  }

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    const fieldIsSelected = selectedFields.some(selectedField =>
      stringArrayCompare(selectedField, field.id ?? [field.name]),
    );
    if (fieldIsSelected) {
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
