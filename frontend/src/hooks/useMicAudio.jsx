import React from "react";

function useMicAudio({ isRecording, frequencyResolution = 2048 } = {}) {
  const audioContextRef = React.useRef(null);
  const analyserRef = React.useRef(null);
  const [isMicInitialized, setIsMicInitialized] = React.useState(false);

  React.useEffect(() => {
    if (!isRecording) return;
    async function initializeAudio() {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        // Connect the microphone stream to the analyser
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        // Set up analyser parameters
        analyser.fftSize = frequencyResolution;

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        setIsMicInitialized(true);
      } catch (e) {
        console.error("Error accessing microphone:", e);
      }
    }
    initializeAudio();
  });

  return { audioContextRef, analyserRef, isMicInitialized };
}

export default useMicAudio;
