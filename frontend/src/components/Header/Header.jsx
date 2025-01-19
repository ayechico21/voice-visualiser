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
  padding: 8px 16px;
`;
const Name = styled.h1`
  text-align: center;
`;

export default Header;
