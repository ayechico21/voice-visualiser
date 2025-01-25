import React from "react";
import FrequencyVisual from "..//FrequencyVisual/FrequencyVisual";
import AmplitudeVisual from "..//AmplitudeVisual/AmplitudeVisual";
import SignalEneryVisual from "..//SignalEneryVisual/SignalEneryVisual";
import ZcrVisual from "..//ZcrVisual/ZcrVisual";
import PitchVisual from "..//PitchVisual/PitchVisual";
import FormantVisual from "..//FormantVisual/FormantVisual";
import styled from "styled-components";
import SpectralCentroidVisual from "../SpectralCentroidVisual/SpectralCentroidVisual";
import SpectralBandwidthVisual from "../SpectralBandwidthVisual/SpectralBandwidthVisual";
import HarmonicsToNoiseVisual from "../HnrVisual/HnrVisual";
import MFCCVisual from "../MfccVisual/MfccVisual";
import PitchEnergyStdVisual from "../PitchEnergyStdVisual/PitchEnergyStdVisual";
import JitterVisual from "../JitterVisual/JitterVisual";
import ShimmerVisual from "../ShimmerVisual/ShimmerVisual";

function Visuals({ isRecording }) {
  return (
    <div>
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

      <VisualWrapper>
        <SpectralCentroidVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Spectral Centroid Visual</VisualHeading>
          {/* <p>
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
          </p> */}
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <SpectralBandwidthVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Spectral Bandwidth Visual</VisualHeading>
          {/* <p>
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
          </p> */}
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <HarmonicsToNoiseVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Harmonic To Noise </VisualHeading>
          {/* <p>
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
          </p> */}
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <MFCCVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Mel-Frequency Cepstral Coefficients</VisualHeading>
          {/* <p>
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
          </p> */}
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <PitchEnergyStdVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Pitch Energy Standard deviation</VisualHeading>
          {/* <p>
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
          </p> */}
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <JitterVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Jitter</VisualHeading>
          {/* <p>
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
          </p> */}
        </VisualInfoWrapper>
      </VisualWrapper>
      <VisualWrapper>
        <ShimmerVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Shimmer</VisualHeading>
          {/* <p>
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
          </p> */}
        </VisualInfoWrapper>
      </VisualWrapper>
    </div>
  );
}

const VisualWrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const VisualInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  flex: 1;
  text-align: justify;
`;

const VisualHeading = styled.h2`
  text-align: center;
`;

export default Visuals;
