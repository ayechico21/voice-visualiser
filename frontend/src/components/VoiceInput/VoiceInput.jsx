import React from "react";
import FrequencyVisual from "../FrequencyVisual/FrequencyVisual";
import AmplitudeVisual from "../AmplitudeVisual/AmplitudeVisual";
import SignalEneryVisual from "../SignalEneryVisual/SignalEneryVisual";
import ZcrVisual from "../ZcrVisual/ZcrVisual";
import PitchVisual from "../PitchVisual/PitchVisual";
import FormantVisual from "../FormantVisual/FormantVisual";

function VoiceInput() {
  const [isRecording, setIsRecording] = React.useState(false);

  const toggleRecording = () => {
    setIsRecording((current) => !current);
  };

  return (
    <div>
      <h2>Voice Input Visualization</h2>
      <button onClick={toggleRecording}>
        {isRecording ? "Stop" : "Start Speaking"}
      </button>
      <h2>Frequency Waveform</h2>
      <FrequencyVisual isRecording={isRecording} />
      <h2>Pitch Visual</h2>
      <PitchVisual isRecording={isRecording} />
      <h2>Format Visual</h2>
      <FormantVisual isRecording={isRecording} />
      <h2>Loudness Waveform</h2>
      <AmplitudeVisual isRecording={isRecording} />
      <h2>Signal Energy Waveform</h2>
      <SignalEneryVisual isRecording={isRecording} />
      <h2>Zero Crossing Rate</h2>
      <ZcrVisual isRecording={isRecording} />
    </div>
  );
}

export default VoiceInput;
