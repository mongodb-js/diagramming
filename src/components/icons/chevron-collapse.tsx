import { useTheme } from '@emotion/react';

export const ChevronCollapse = ({ size = 14 }: { size?: number }) => {
  const theme = useTheme();
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.25 3.25L8 6.5L11.75 3.25M4.25 12.75L8 9.5L11.75 12.75"
        stroke={theme.node.headerIcon}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
