import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

const FormantVisual = ({ isRecording }) => {
  const canvasRef = React.useRef(null);
  const [audioContextRef, analyserRef] = useMicAudio();
  const animationFrameIdRef = React.useRef(null);

  React.useEffect(() => {
    function run() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount; // Half of FFT size
      const dataArray = new Float32Array(bufferLength);

      function draw() {
        analyser.getFloatFrequencyData(dataArray); // Get frequency spectrum data

        // Detect formants
        const formants = detectFormants(dataArray, audioContextRef.current.sampleRate);

        // Clear canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Draw spectrum
        const barWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] + 140) * 2; // Normalize decibel range
          const color = `rgb(${barHeight + 50}, 100, 150)`;
          canvasContext.fillStyle = color;
          canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;
        }

        // Highlight formants
        formants.forEach((formant, index) => {
          const frequencyX = (formant.frequency / (audioContextRef.current.sampleRate / 2)) * canvas.width;
          canvasContext.fillStyle = "red";
          canvasContext.beginPath();
          canvasContext.arc(frequencyX, canvas.height - 200, 10, 0, 2 * Math.PI);
          canvasContext.fill();

          canvasContext.fillStyle = "white";
          canvasContext.font = "12px Arial";
          canvasContext.fillText(`F${index + 1}: ${Math.round(formant.frequency)} Hz`, frequencyX - 20, canvas.height - 220);
        });

        animationFrameIdRef.current = requestAnimationFrame(draw);
      }

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
    <Canvas  ref={canvasRef} style={{
      border: "2px solid #555",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#1e1e1e",
    }}/>
  );
};

// Detect formants by finding peaks in the frequency spectrum
const detectFormants = (dataArray, sampleRate) => {
  const formants = [];
  const threshold = -50; // Threshold for peak detection in decibels
  let isPeak = false;
  let peakFrequency = 0;
  let peakValue = -Infinity;

  for (let i = 0; i < dataArray.length; i++) {
    const frequency = (i / dataArray.length) * (sampleRate / 2); // Convert index to frequency
    const value = dataArray[i];

    if (value > threshold && value > peakValue) {
      isPeak = true;
      peakFrequency = frequency;
      peakValue = value;
    } else if (isPeak && value < peakValue) {
      formants.push({ frequency: peakFrequency, value: peakValue });
      if (formants.length === 2) break; // Stop after detecting F1 and F2
      isPeak = false;
      peakValue = -Infinity;
    }
  }

  return formants;
};

export default FormantVisual;
