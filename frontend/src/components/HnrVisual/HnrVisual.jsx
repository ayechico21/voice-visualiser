import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function HarmonicsToNoiseVisual({ isRecording }) {
  const canvasRef = React.useRef(null);
  const { analyserRef, isMicInitialized } = useMicAudio({ isRecording });
  const animationFrameIdRef = React.useRef(null);

  React.useEffect(() => {
    if (!isMicInitialized || !isRecording) return;

    function run() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.fftSize;
      const dataArray = new Float32Array(bufferLength);

      function draw() {
        analyser.getFloatTimeDomainData(dataArray);

        // Calculate HNR
        const hnr = calculateHNR(dataArray);

        // Clear canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background gradient
        const gradient = canvasContext.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, "#ffafbd");
        gradient.addColorStop(1, "#ffc3a0");
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Visualize HNR as a bar
        const barHeight = (hnr / 50) * canvas.height; // Normalize HNR (assuming max HNR = 50)
        canvasContext.fillStyle = "rgba(255, 255, 255, 0.8)";
        canvasContext.fillRect(
          canvas.width / 3,
          canvas.height - barHeight,
          canvas.width / 3,
          barHeight
        );

        // Add HNR label
        canvasContext.fillStyle = "white";
        canvasContext.font = "16px Arial";
        canvasContext.fillText(
          `HNR: ${hnr.toFixed(2)} dB`,
          canvas.width / 2 - 40,
          30
        );

        // Animate
        animationFrameIdRef.current = requestAnimationFrame(draw);
      }

      draw();
    }

    run();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [analyserRef, isRecording, isMicInitialized]);

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

const calculateHNR = (data) => {
  // Autocorrelation method to estimate harmonicity
  let maxCorrelation = 0;
  let noiseLevel = 0;

  for (let lag = 1; lag < data.length / 2; lag++) {
    let correlation = 0;

    for (let i = 0; i < data.length - lag; i++) {
      correlation += data[i] * data[i + lag];
    }

    if (correlation > maxCorrelation) {
      maxCorrelation = correlation;
    }
    noiseLevel += Math.abs(correlation);
  }

  // Avoid division by zero
  if (noiseLevel === 0) return 0;

  const hnr = 10 * Math.log10(maxCorrelation / (noiseLevel - maxCorrelation));
  return Math.max(hnr, 0); // Ensure HNR is non-negative
};

export default HarmonicsToNoiseVisual;
