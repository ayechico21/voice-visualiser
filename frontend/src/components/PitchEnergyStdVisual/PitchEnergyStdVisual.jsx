import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function PitchEnergyStdVisual  ({ isRecording })  {
  const canvasRef = React.useRef(null);
  const { analyserRef, isMicInitialized } = useMicAudio({ isRecording });
  const animationFrameIdRef = React.useRef(null);

  React.useEffect(() => {
    if (!isMicInitialized || !isRecording) return;

    function draw() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const fftSize = analyser.fftSize;
      const dataArray = new Float32Array(fftSize);

      analyser.getFloatTimeDomainData(dataArray);

      // Compute pitch and energy
      const sampleRate = analyser.context.sampleRate;
      const pitch = computePitch(dataArray, sampleRate);
      const energy = computeEnergy(dataArray);

      // Update running arrays for standard deviation calculation
      const maxSamples = 100; // Keep last 100 samples
      if (!draw.pitchHistory) draw.pitchHistory = [];
      if (!draw.energyHistory) draw.energyHistory = [];

      draw.pitchHistory.push(pitch);
      draw.energyHistory.push(energy);

      if (draw.pitchHistory.length > maxSamples) draw.pitchHistory.shift();
      if (draw.energyHistory.length > maxSamples) draw.energyHistory.shift();

      // Calculate standard deviation
      const stdDev = (arr) => {
        const mean = arr.reduce((sum, value) => sum + value, 0) / arr.length;
        const variance =
          arr.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
          arr.length;
        return Math.sqrt(variance);
      };

      const pitchStdDev = stdDev(draw.pitchHistory);
      const energyStdDev = stdDev(draw.energyHistory);

      // Clear canvas
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      canvasContext.fillStyle = "#1e1e1e";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      // Visualize pitch and energy standard deviation
      const barWidth = canvas.width / 4;
      const maxBarHeight = canvas.height / 2;

      // Pitch standard deviation bar
      const pitchBarHeight = Math.min(
        (pitchStdDev / 300) * maxBarHeight,
        maxBarHeight
      ); // Normalize for display
      canvasContext.fillStyle = "rgba(0, 150, 255, 0.8)";
      canvasContext.fillRect(
        canvas.width / 4 - barWidth / 2,
        canvas.height - pitchBarHeight - 20,
        barWidth,
        pitchBarHeight
      );
      canvasContext.fillStyle = "white";
      canvasContext.fillText(
        `Pitch Std: ${pitchStdDev.toFixed(2)} Hz`,
        canvas.width / 4 - 40,
        canvas.height - 5
      );

      // Energy standard deviation bar
      const energyBarHeight = Math.min(
        (energyStdDev / 0.1) * maxBarHeight,
        maxBarHeight
      ); // Normalize for display
      canvasContext.fillStyle = "rgba(255, 150, 0, 0.8)";
      canvasContext.fillRect(
        (3 * canvas.width) / 4 - barWidth / 2,
        canvas.height - energyBarHeight - 20,
        barWidth,
        energyBarHeight
      );
      canvasContext.fillStyle = "white";
      canvasContext.fillText(
        `Energy Std: ${energyStdDev.toFixed(4)}`,
        (3 * canvas.width) / 4 - 50,
        canvas.height - 5
      );

      animationFrameIdRef.current = requestAnimationFrame(draw);
    }

    draw();

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

const computePitch = (data, sampleRate) => {
  // Autocorrelation to estimate fundamental frequency
  let maxCorrelation = 0;
  let pitch = 0;

  for (let lag = 1; lag < data.length / 2; lag++) {
    let correlation = 0;

    for (let i = 0; i < data.length - lag; i++) {
      correlation += data[i] * data[i + lag];
    }

    if (correlation > maxCorrelation) {
      maxCorrelation = correlation;
      pitch = sampleRate / lag;
    }
  }

  return pitch;
};

const computeEnergy = (data) => {
  // Short-term energy of the signal
  return data.reduce((sum, sample) => sum + sample * sample, 0) / data.length;
};

export default PitchEnergyStdVisual;
