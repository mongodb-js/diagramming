import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';

import { DEFAULT_DEPTH_SPACING, DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';

const FieldDepthWrapper = styled.div`
  padding-right: ${DEFAULT_DEPTH_SPACING}px;
  height: ${DEFAULT_FIELD_HEIGHT}px;
  border-left: 1px solid ${palette.gray.dark2};
`;

interface Props {
  depth: number;
}

export const FieldDepth = (props: Props) => {
  return (
    <>
      {[...Array(props.depth)].map((_ignored, i) => (
        <FieldDepthWrapper key={i} />
      ))}
    </>
  );
};
