import React from "react";

function useMicAudio({ frequencyResolution = 2048 } = {}) {
  const audioContextRef = React.useRef(null);
  const analyserRef = React.useRef(null);

  React.useEffect(() => {
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
      } catch (e) {
        console.error("Error accessing microphone:", e);
      }
    }
    initializeAudio();
  });

  return [audioContextRef, analyserRef];
}

export default useMicAudio;
