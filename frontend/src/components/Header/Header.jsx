import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Wrapper>
      <Name>Voice Visualiser</Name>
    </Wrapper>
  );
}

const Wrapper = styled.div`
 
`;
const Name = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-size: 2.5rem;
  color: var(--primary-theme);
`;

export default Header;
