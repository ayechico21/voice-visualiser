import React from "react";
import styled from "styled-components";

function VoiceInput({ isRecording, toggleRecording }) {
  return (
    <Wrapper>
      <StyledButton onClick={toggleRecording}>
        {isRecording ? "Pause" : "Begin"}
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button``;

export default VoiceInput;
