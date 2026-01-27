import { useTheme } from '@emotion/react';

export const ChevronDown = ({ size = 14 }: { size?: number }) => {
  const theme = useTheme();
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.005" y="0.005" width={size} height={size} stroke="black" strokeOpacity="0.01" strokeWidth="0.01" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 5.5l3.5 3.5 3.5-3.5"
        stroke={theme.node.headerIcon}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
