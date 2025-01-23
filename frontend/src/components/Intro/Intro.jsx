import React from "react";
import styled from "styled-components";

function Intro() {
  return (
    <Wrapper>
      <Info>
        See your voice come to life with dynamic, real-time visualizations. This
        tool captures and analyzes your voice, displaying key features like
        pitch, energy, and frequency through interactive graphs.
      </Info>
      <Heading>Experience your sound in a whole new way!</Heading>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 16px 0;
  text-align: center;
`;
const Heading = styled.h2`
  color: var(--primary-theme);
  text-align: center;
`;
const Info = styled.p`
  
`;

export default Intro;
