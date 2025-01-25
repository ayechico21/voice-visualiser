import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function SpectralBandwidthVisual ({ isRecording }) {
  const canvasRef = React.useRef(null);
  const { analyserRef, isMicInitialized } = useMicAudio({ isRecording });
  const animationFrameIdRef = React.useRef(null);

  React.useEffect(() => {
    if (!isMicInitialized || !isRecording) return;

    function run() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      

      function draw() {
        analyser.getByteFrequencyData(dataArray);

        // Calculate Spectral Centroid and Bandwidth
        const sampleRate = analyser.context.sampleRate;
        const spectralCentroid = calculateSpectralCentroid(
          dataArray,
          sampleRate
        );
        const spectralBandwidth = calculateSpectralBandwidth(
          dataArray,
          sampleRate,
          spectralCentroid
        );

        // Clear canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background gradient
        const gradient = canvasContext.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, "#1c92d2");
        gradient.addColorStop(1, "#f2fcfe");
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Normalize values for canvas rendering
        const centroidX = (spectralCentroid / (sampleRate / 2)) * canvas.width;
        const bandwidthX =
          (spectralBandwidth / (sampleRate / 2)) * canvas.width;

        // Draw Spectral Centroid line
        canvasContext.strokeStyle = "white";
        canvasContext.lineWidth = 3;
        canvasContext.beginPath();
        canvasContext.moveTo(centroidX, 0);
        canvasContext.lineTo(centroidX, canvas.height);
        canvasContext.stroke();

        // Draw Spectral Bandwidth as shaded region
        canvasContext.fillStyle = "rgba(255, 255, 255, 0.3)";
        canvasContext.fillRect(
          centroidX - bandwidthX,
          0,
          bandwidthX * 2,
          canvas.height
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
};

const  calculateSpectralCentroid = (data, sampleRate) => {
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < data.length; i++) {
    const frequency = (i * sampleRate) / (2 * data.length);
    const magnitude = data[i];
    numerator += frequency * magnitude;
    denominator += magnitude;
  }

  return denominator === 0 ? 0 : numerator / denominator;
}

const calculateSpectralBandwidth = (data, sampleRate, centroid) => {
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < data.length; i++) {
    const frequency = (i * sampleRate) / (2 * data.length);
    const magnitude = data[i];
    numerator += magnitude * Math.pow(frequency - centroid, 2);
    denominator += magnitude;
  }

  const variance = denominator === 0 ? 0 : numerator / denominator;
  return Math.sqrt(variance); // Standard deviation
}

export default SpectralBandwidthVisual;
