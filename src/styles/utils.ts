export const hexToRgb = (hex: string, opacity: number) => {
  const rgb = [parseInt(hex[1] + hex[2], 16), parseInt(hex[3] + hex[4], 16), parseInt(hex[5] + hex[6], 16)];
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]}, ${opacity})`;
};
