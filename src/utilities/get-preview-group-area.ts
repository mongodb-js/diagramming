import { NodeField } from '@/types';

export interface PreviewGroupArea {
  height: number;
  width: number;
}

export const DEFAULT_PREVIEW_GROUP_AREA = {
  height: 0,
  width: 0,
};

export const getPreviewId = (id: number, name: string) => {
  return `${id}.${name}`;
};

/**
 * Computes the area of consecutive groups of fields with the variant "preview".
 * Height is a unit that is denoted by the number of consecutive fields.
 * Width is a unit that is denoted by the highest number of glyphs within those consecutive fields.
 */
export const getPreviewGroupArea = (fields: NodeField[]) => {
  let currentArea = DEFAULT_PREVIEW_GROUP_AREA;
  let name = undefined;

  const previewArea: Record<string, PreviewGroupArea> = {};

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (field.variant === 'preview') {
      if (!name) {
        name = getPreviewId(i, field.name);
      }
      currentArea = {
        height: currentArea.height + 1,
        width: Math.max(currentArea.width, field.glyphs?.length || 0),
      };
    } else {
      if (currentArea.height > 0 && name) {
        previewArea[name] = currentArea;
        currentArea = DEFAULT_PREVIEW_GROUP_AREA;
        name = undefined;
      }
    }
  }

  if (currentArea.height > 0 && name) {
    previewArea[name] = currentArea;
  }

  return previewArea;
};
