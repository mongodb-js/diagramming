import styled from '@emotion/styled';
import { spacing } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';

import { DEFAULT_FIELD_HEIGHT } from '@/utilities/constants';

const FieldDepthWrapper = styled.div`
  padding-right: ${spacing[200]}px;
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
