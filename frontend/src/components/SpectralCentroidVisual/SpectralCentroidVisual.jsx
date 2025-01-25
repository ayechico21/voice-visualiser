import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function SpectralCentroidVisual ({ isRecording }){
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

        // Calculate Spectral Centroid
        const sampleRate = analyser.context.sampleRate;
        const spectralCentroid = calculateSpectralCentroid(
          dataArray,
          sampleRate
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
        gradient.addColorStop(0, "#ff7e5f");
        gradient.addColorStop(1, "#feb47b");
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Visualize Spectral Centroid as a vertical line
        const x = (spectralCentroid / (sampleRate / 2)) * canvas.width; // Normalize to canvas width
        canvasContext.strokeStyle = "white";
        canvasContext.lineWidth = 4;

        canvasContext.beginPath();
        canvasContext.moveTo(x, 0);
        canvasContext.lineTo(x, canvas.height);
        canvasContext.stroke();

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

export default SpectralCentroidVisual;
