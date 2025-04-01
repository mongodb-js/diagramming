import { NodeProps } from '@xyflow/react';
import styled from '@emotion/styled';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';
import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { ellipsisTruncation } from '@/styles/styles';
import { InternalNode } from '@/types';

const NODE_HEADER_HEIGHT_PIXELS = 28;
const NODE_WIDTH_PIXELS = 244;

const NodeWrapper = styled.div<{ background: string }>`
  position: relative;
  font-family: ${fontFamilies.code};
  background: ${props => props.theme.node.background};
  color: ${props => props.theme.node.color};
  width: ${NODE_WIDTH_PIXELS}px;
  border-radius: ${spacing[200]}px;
  overflow: hidden;

  &:hover {
    background: ${props => props.theme.node.backgroundHover};
  }

  &::before {
    position: absolute;
    display: block;
    content: ' ';
    height: 100%;
    background: ${props => props.background};
    width: 2px;
  }
  border-left: 1px solid ${props => props.background};
  &:hover {
    border-left: 1px solid ${props => props.background};
  }

  border: 1px solid ${props => props.theme.node.border};
`;

const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 20px;
  font-weight: bold;
  height: ${NODE_HEADER_HEIGHT_PIXELS}px;
  padding: ${spacing[100]}px ${spacing[400]}px ${spacing[100]}px ${spacing[200]}px;
  ${ellipsisTruncation}
`;

export const Node = ({ type, data: { title } }: NodeProps<InternalNode>) => {
  const theme = useTheme();

  const accent = useMemo(() => {
    if (type === 'TABLE') {
      return theme.node.relationalAccent;
    }
    return theme.node.mongoDBAccent;
  }, [type, theme.node.relationalAccent, theme.node.mongoDBAccent]);

  return (
    <NodeWrapper background={accent}>
      <NodeHeader>{title}</NodeHeader>
    </NodeWrapper>
  );
};
