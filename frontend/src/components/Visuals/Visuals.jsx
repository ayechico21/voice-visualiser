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
    <Wrapper>
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
          <p>
            The Spectral Centroid Visualizer shows the "center of mass" of audio
            frequencies in real time. A moving vertical line represents where
            most of the sound's energy lies, with low frequencies on the left
            and high frequencies on the right, visualizing the sound’s tonal
            balance.
          </p>
          <p>
            Simply put, it helps you see whether a sound is bass-heavy or
            treble-rich, offering an interactive way to explore the tonal
            properties of audio.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <SpectralBandwidthVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Spectral Bandwidth Visual</VisualHeading>
          <p>
            The Spectral Bandwidth Visualizer displays both the center and the
            spread of audio frequencies. A vertical line represents the spectral
            centroid, or "center of mass," while a shaded region around it shows
            the spectral bandwidth—the range of frequencies in the sound. This
            allows you to see how concentrated or dispersed the sound is across
            the frequency spectrum.
          </p>
          <p>
            Simply put, the visualizer reveals the "shape" of sound, whether
            it's narrow and focused like a pure tone, or broad and rich like
            complex music, offering a dynamic, real-time view of the sound's
            clarity and texture.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      {/* <VisualWrapper>
        <HarmonicsToNoiseVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Harmonic To Noise </VisualHeading>
          <p>
            The Harmonics-to-Noise Ratio (HNR) Visualizer displays a vertical
            bar that shows the balance between harmonic (organized) and noise
            (random) components in sound. A taller bar indicates a clearer, more
            melodic sound, while a shorter bar suggests more noise or less
            harmonic content.
          </p>
          <p>
            Simply put, the HNR Visualizer helps you assess the purity of sound
            by visualizing its tonal structure. It’s ideal for analyzing vocals,
            music, or environmental noise, providing insight into how "clean" or
            "noisy" the sound is.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper> */}

      <VisualWrapper>
        <MFCCVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Mel-Frequency Cepstral Coefficients</VisualHeading>
          <p>
            The MFCC Visualizer transforms audio input into a dynamic heatmap,
            where each bar represents a unique Mel-Frequency Cepstral
            Coefficient (MFCC). These values capture essential information about
            the sound’s frequency and energy, aiding in the analysis of tonal
            and timbral characteristics, particularly for speech and audio
            recognition.
          </p>
          <p>
            In simpler terms, the MFCC Visualizer breaks down audio into its
            core components, mimicking human sound perception. By visualizing
            this data, it helps uncover patterns in speech, music, or other
            audio signals.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <PitchEnergyStdVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Pitch Energy Standard deviation</VisualHeading>
          <p>
            The Pitch and Energy Standard Deviation Visualizer analyzes the
            variability in pitch and energy of an audio signal over time. It
            computes the fundamental frequency (pitch) and short-term energy,
            then calculates their standard deviations to measure the stability
            or variability of the sound.
          </p>
          <p>
            The visualization shows two bars—one for pitch variability and one
            for energy variability. The height of each bar represents the
            standard deviation, providing real-time feedback on sound
            consistency, which is useful for speech analysis, music evaluation,
            and acoustic studies.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>

      <VisualWrapper>
        <JitterVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Jitter</VisualHeading>
          <p>
            The JitterVisual component visualizes jitter, or variations in pitch
            frequency, in real-time audio recordings. Using the Web Audio API,
            it analyzes pitch fluctuations and displays them as a dynamic jitter
            bar on a canvas, making it easy to track subtle tonal changes,
            especially in speech or music.
          </p>
          <p>
            Essentially, the JitterVisual monitors pitch variation over time,
            revealing how much the pitch "wobbles." This makes it useful for
            speech analysis, music processing, or detecting inconsistencies in
            live audio.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper>
      {/* <VisualWrapper>
        <ShimmerVisual isRecording={isRecording} />
        <VisualInfoWrapper>
          <VisualHeading>Shimmer</VisualHeading>
          <p>
            The ShimmerVisual component visualizes shimmer, which refers to
            variations in amplitude in audio signals, especially in speech or
            vocals. It processes real-time audio to generate a dynamic display,
            where the height of the shimmer bar reflects the degree of amplitude
            fluctuation, helping to track loudness and energy changes.
          </p>
          <p>
            By analyzing consecutive amplitude peaks, the ShimmerVisual reveals
            patterns in volume variation, making it useful for applications like
            speech analysis or audio processing.
          </p>
        </VisualInfoWrapper>
      </VisualWrapper> */}
    </Wrapper>
  );
}

const Wrapper = styled.main``;

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
