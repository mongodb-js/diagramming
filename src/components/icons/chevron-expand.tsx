import { useTheme } from '@emotion/react';

export const ChevronExpand = ({ size = 14 }: { size?: number }) => {
  const theme = useTheme();
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.25 6.5
        L8 3.25
        L11.75 6.5
        M4.25 9.5
        L8 12.7
        L11.75 9.5"
        stroke={theme.node.headerIcon}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
