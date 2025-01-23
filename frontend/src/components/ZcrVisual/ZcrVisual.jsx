import React, { useRef, useEffect } from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

const ZcrVisual = ({ isRecording }) => {
  const canvasRef = useRef(null);
  const [audioContextRef, analyserRef] = useMicAudio();
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    function run() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.fftSize; // Number of samples in the time domain
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        analyser.getByteTimeDomainData(dataArray);

        // Compute Zero-Crossing Rate
        const zcr = calculateZCR(dataArray, bufferLength);

        // Clear canvas
        canvasContext.fillStyle = "rgb(30, 30, 30)";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Draw ZCR value as a bar
        const barHeight = zcr * canvas.height;
        canvasContext.fillStyle = "rgb(0, 200, 50)";
        canvasContext.fillRect(50, canvas.height - barHeight, 100, barHeight);

        // Draw text for ZCR
        canvasContext.fillStyle = "white";
        canvasContext.font = "16px Arial";
        canvasContext.fillText(`ZCR: ${zcr.toFixed(3)}`, 60, 30);

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
};

function calculateZCR(data, bufferLength) {
  let zeroCrossings = 0;
  for (let i = 1; i < data.length; i++) {
    // Normalize data to range [-1, 1]
    const currentValue = data[i] / 128 - 1; // Centered at 0
    const prevValue = data[i - 1] / 128 - 1;

    // Check if the sign changes (zero crossing)
    if (currentValue * prevValue < 0) {
      zeroCrossings++;
    }
  }
  return zeroCrossings / bufferLength; // Normalize by the total number of samples
}

export default ZcrVisual;
