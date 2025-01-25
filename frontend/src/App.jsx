import React from "react";
import Header from "./components/Header";
import Intro from "./components/Intro/Intro";
import VoiceInput from "./components/VoiceInput/VoiceInput";
import styled from "styled-components";
import Visuals from "./components/Visuals/Visuals";

function App() {
  const [isRecording, setIsRecording] = React.useState(false);

  const toggleRecording = () => {
    setIsRecording((current) => !current);
  };
  return (
    <Wrapper>
      <Header />
      <Intro />
      <VoiceInput isRecording={isRecording} toggleRecording={toggleRecording} />
      <Visuals isRecording={isRecording} />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  --primary-theme: #07ae87;
  padding: 8px 16px;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 1.2rem;
  display: grid;
  place-content: center;
  gap: 16px;
`;

/* const API_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("API_URL : ", API_URL);
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => console.log(data));
 */

export default App;
