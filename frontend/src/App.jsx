import React from "react";
import Header from "./components/Header";
import Intro from "./components/Intro/Intro";
import VoiceInput from "./components/VoiceInput/VoiceInput";
import FrequencyVisual from "./components/FrequencyVisual/FrequencyVisual";
import AmplitudeVisual from "./components/AmplitudeVisual/AmplitudeVisual";
import SignalEneryVisual from "./components/SignalEneryVisual/SignalEneryVisual";
import ZcrVisual from "./components/ZcrVisual/ZcrVisual";
import PitchVisual from "./components/PitchVisual/PitchVisual";
import FormantVisual from "./components/FormantVisual/FormantVisual";
import styled from "styled-components";

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

      <VisualWrapper>
        <FrequencyVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Frequency Waveform</VisualHeading>
          <p>
            The frequency visualizer displays a dynamic graph that reacts to
            sounds, breaking them down into various frequency ranges. Think of
            it as a series of bars that move up and down in real time, each bar
            representing a different pitch range. The height of each bar depends
            on how loud or strong that particular sound is at the moment.
          </p>
          <p>
            In simple terms, the frequency visualizer helps you "see" sound,
            turning audio into something visual that shows how the sound is made
            up. It gives you a glimpse of the balance of low, middle, and high
            frequencies in the audio, which can help you understand the clarity
            and quality of the sound you’re hearing.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <PitchVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Pitch Visual</VisualHeading>
          <p>
            The pitch visualizer shows a dynamic graph that responds to the
            sound of your voice in real time. Picture it as a line that moves up
            and down, representing the changing pitch of your voice as you speak
            or sing. Higher points on the graph indicate higher pitches, while
            lower points represent lower pitches.
          </p>
          <p>
            Essentially, the pitch visualizer allows you to "see" your voice. By
            capturing the sound through the mic, it provides a visual display of
            how your pitch fluctuates. This can help you track the tone and
            consistency of your voice, offering real-time feedback as you
            communicate or perform.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <FormantVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Format Visual</VisualHeading>
          <p>
            The formant visualizer shows a dynamic graph that responds to sound
            in real time, specifically focusing on the formants of your voice.
            Formants are the resonant frequencies that shape vowel sounds and
            are crucial for understanding speech. The graph represents the sound
            spectrum, with bars that move up and down based on the strength of
            different frequencies
          </p>
          <p>
            In summary, the formant visualizer lets you "see" the vowel-like
            qualities in your voice, helping you understand how formants shape
            speech and vocal sound. It provides a visual guide to track and
            analyze the resonant frequencies that are key to clear and accurate
            speech or singing.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <AmplitudeVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Loudness Waveform</VisualHeading>
          <p>
            The amplitude visualizer displays a dynamic graph that reacts to
            sound in real time, showing the fluctuations in the amplitude
            (volume) of the sound. Picture it as a smooth, flowing waveform that
            moves up and down, with peaks and valleys that correspond to the
            loudness of the sound you're recording. The height of the waveform
            reflects how loud or soft the sound is at any given moment.
          </p>
          <p>
            In essence, the amplitude visualizer allows you to track the
            loudness of the sound in real time, turning volume changes into a
            beautiful, flowing graphical representation. It helps you monitor
            sound intensity and gain a deeper understanding of the audio you're
            recording.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <SignalEneryVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Signal Energy Waveform</VisualHeading>
          <p>
            The signal energy visualizer shows a dynamic graph that tracks the
            energy levels of the sound you're recording in real time. It
            displays the fluctuations in the signal’s volume, with a graph that
            rises and falls based on how loud or quiet the sound is at any given
            moment. This is represented as a green line moving smoothly across
            the canvas, which reflects the energy of the sound.
          </p>
          <p>
            In essence, the signal energy visualizer provides a graphical
            representation of the audio signal's energy. It helps you monitor
            changes in loudness, ensuring you can easily spot fluctuations and
            adjust accordingly, whether you’re recording or analyzing audio.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <ZcrVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Zero Crossing Rate</VisualHeading>
          <p>
            The Zero-Crossing Rate (ZCR) visualizer displays a graph that
            represents the rate at which the audio signal crosses the zero line
            in its waveform. Essentially, it counts how many times the audio
            signal changes direction from positive to negative or vice versa,
            showing this as a bar that fluctuates in real time based on the
            sound you're recording.
          </p>
          <p>
            In summary, the Zero-Crossing Rate visualizer helps you "see" the
            structure and texture of the audio in terms of its frequency of
            changes, providing an intuitive way to analyze the behavior of
            sounds based on their waveform characteristics.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>
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

const VisualWrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
`;

const VisualInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const VisualHeading = styled.h2`
  text-align: center;
`;

/* const API_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("API_URL : ", API_URL);
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => console.log(data));
 */

export default App;
