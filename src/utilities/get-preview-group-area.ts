import { NodeField } from '@/types';

export interface PreviewGroupArea {
  height: number;
  width: number;
}

/**
 * Computes the area of consecutive groups of fields with the variant "preview"
 * Height is a unit that is denoted by the number of consecutive fields
 * Width is a unit that is denoted by the highest number of glyphs within those consecutive fields.
 */
export const getPreviewGroupArea = (fields: Array<NodeField>) => {
  let currentMaxNumberOfGlyphs = 0;
  let currentGroup: string[] = [];

  const borderLength: Record<string, PreviewGroupArea> = {};

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (field.variant === 'preview') {
      currentGroup.push(field.name);
      currentMaxNumberOfGlyphs = Math.max(currentMaxNumberOfGlyphs, field.glyphs?.length || 0);
    } else {
      if (currentGroup.length > 0) {
        borderLength[currentGroup[0]] = {
          height: currentGroup.length,
          width: currentMaxNumberOfGlyphs,
        };
        currentGroup = [];
        currentMaxNumberOfGlyphs = 0;
      }
    }
  }

  if (currentGroup.length > 0) {
    borderLength[currentGroup[0]] = {
      height: currentGroup.length,
      width: currentMaxNumberOfGlyphs,
    };
  }

  return borderLength;
};
