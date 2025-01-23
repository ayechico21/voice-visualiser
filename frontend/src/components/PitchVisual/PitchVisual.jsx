import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function PitchVisual({ isRecording }) {
  const canvasRef = React.useRef(null);
  const [audioContextRef, analyserRef] = useMicAudio();
  const animationFrameIdRef = React.useRef(null);
  const pitchHistoryRef = React.useRef([]); // Track pitch history

  React.useEffect(() => {
    function run() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Get the audio input stream

      const draw = () => {
        analyser.getByteFrequencyData(dataArray);

        const pitch = autoCorrelate(
          dataArray,
          audioContextRef.current.sampleRate
        );
        const pitchHistory = pitchHistoryRef.current;
        pitchHistory.push(pitch > 0 ? pitch : 0); // Use 0 for undetected pitch
        if (pitchHistory.length > 100) {
          pitchHistory.shift();
        }

        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Draw pitch history
        canvasContext.strokeStyle = "rgb(0, 0, 255)";
        canvasContext.lineWidth = 2;
        canvasContext.beginPath();

        pitchHistory.forEach((pitch, index) => {
          const x = (index / pitchHistory.length) * canvas.width;
          const y = canvas.height - (pitch / 1000) * canvas.height; // Scale pitch (assuming max 1000 Hz)
          if (index === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }
        });

        canvasContext.stroke();

        animationFrameIdRef.current = requestAnimationFrame(draw);
      };
      draw();
    }
    if (isRecording) {
      run();
    }
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [audioContextRef, analyserRef, isRecording]);

  return (
    <Canvas
      ref={canvasRef}
      style={{
        border: "2px solid #555",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#1e1e1e",
      }}
    />
  );
}

const autoCorrelate = (buffer, sampleRate) => {
  let size = buffer.length;
  let maxSamples = Math.floor(size / 2);
  let bestOffset = -1;
  let bestCorrelation = 0;
  let rms = 0;

  for (let i = 0; i < size; i++) {
    rms += buffer[i] * buffer[i];
  }
  rms = Math.sqrt(rms / size);

  if (rms < 0.01) {
    return -1; // No signal detected
  }

  let lastCorrelation = 1;
  for (let offset = 0; offset < maxSamples; offset++) {
    let correlation = 0;
    for (let i = 0; i < maxSamples; i++) {
      correlation += buffer[i] * buffer[i + offset];
    }
    correlation = correlation / rms;
    if (correlation > 0.9 && correlation > lastCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
    lastCorrelation = correlation;
  }

  if (bestCorrelation > 0.01) {
    return sampleRate / bestOffset; // Return pitch in Hz
  }
  return -1;
};

export default PitchVisual;
