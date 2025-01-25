import React from "react";
import styled from "styled-components";

function Canvas({ ...delegated }, ref) {
  return (
    <Wrapper>
      <StyledCanvas ref={ref} {...delegated} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: min(100%, 600px);
`;

const StyledCanvas = styled.canvas`
  width: 100%;
`;

export default React.forwardRef(Canvas);
