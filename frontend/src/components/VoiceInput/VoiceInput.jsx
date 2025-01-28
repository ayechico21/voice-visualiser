import React from "react";
import styled, { keyframes, css } from "styled-components";

function VoiceInput({ isRecording, toggleRecording }) {
  return (
    <Wrapper>
      <StyledButton onClick={toggleRecording} $isRecording={isRecording}>
        {isRecording ? "Stop" : "Get Started"}
        <Icon $isRecording={isRecording}>
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </Icon>
      </StyledButton>
      {/* <StyledButton onClick={toggleRecording}>
        {isRecording ? "Pause" : "Begin"}
      </StyledButton> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Icon = styled.div`
  position: absolute;
  right: var(--padding);
  color: var(--theme);
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: var(--icon-width);
  transition: width 200ms;
  transition: transform 500ms;
  /* width: ${(props) =>
    props.$isRecording
      ? "calc(100% - 2 * var(--padding))"
      : " var(--icon-width)"}; */
`;

const StyledButton = styled.button`
  --icon-width: 48px;
  --padding: 8px;
  /* --theme: hsl(263, 81%, 69%); */
  --theme: hsl(165, 92%, 25%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background-color: var(--theme);
  border: none;
  padding: 8px 16px;
  font-size: 1.2rem;
  padding-right: calc(var(--icon-width) + 16px);
  border-radius: 12px;
  cursor: pointer;
  width: 200px;
  position: relative;
  /* background-color:${(props) =>
    props.$isRecording ? "red" : "hsl(300, 100%, 25%)"}; */

  &:hover ${Icon} {
    width: calc(100% - 2 * var(--padding));
  }
  &:active ${Icon} {
    transform: scale(0.95);
  }
`;
export default VoiceInput;
