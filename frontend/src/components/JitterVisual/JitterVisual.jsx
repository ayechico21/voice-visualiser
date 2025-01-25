import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function JitterVisual ({ isRecording })  {
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

      const sampleRate = analyser.context.sampleRate;
      const pitch = detectPitch(dataArray, sampleRate);

      // Maintain a history of pitches for jitter calculation
      if (!draw.pitchHistory) draw.pitchHistory = [];
      draw.pitchHistory.push(pitch);
      if (draw.pitchHistory.length > 100) draw.pitchHistory.shift(); // Limit to last 100 samples

      const jitter = calculateJitter(draw.pitchHistory);

      // Clear canvas
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      canvasContext.fillStyle = "#1e1e1e";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      // Draw jitter visualization
      const barWidth = canvas.width / 3;
      const maxBarHeight = canvas.height / 2;

      // Jitter bar
      const jitterBarHeight = Math.min(jitter * 1000, maxBarHeight); // Scale for display
      canvasContext.fillStyle = "rgba(255, 100, 100, 0.8)";
      canvasContext.fillRect(
        canvas.width / 2 - barWidth / 2,
        canvas.height - jitterBarHeight - 20,
        barWidth,
        jitterBarHeight
      );

      // Draw label
      canvasContext.fillStyle = "white";
      canvasContext.fillText(
        `Jitter: ${(jitter * 100).toFixed(2)}%`,
        canvas.width / 2 - 40,
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

const detectPitch = (data, sampleRate) => {
  // Autocorrelation method for pitch detection
  let maxCorrelation = 0;
  let bestLag = 0;

  for (let lag = 1; lag < data.length / 2; lag++) {
    let correlation = 0;

    for (let i = 0; i < data.length - lag; i++) {
      correlation += data[i] * data[i + lag];
    }

    if (correlation > maxCorrelation) {
      maxCorrelation = correlation;
      bestLag = lag;
    }
  }

  if (bestLag === 0) return 0;
  return sampleRate / bestLag; // Fundamental frequency (Hz)
};

const calculateJitter = (pitchHistory) => {
  // Calculate jitter as variation in consecutive cycle lengths
  const periods = pitchHistory.map((pitch) => (pitch > 0 ? 1 / pitch : 0));
  let jitterSum = 0;
  let count = 0;

  for (let i = 1; i < periods.length; i++) {
    if (periods[i] > 0 && periods[i - 1] > 0) {
      jitterSum += Math.abs(periods[i] - periods[i - 1]) / periods[i - 1];
      count++;
    }
  }

  return count > 0 ? jitterSum / count : 0;
};

export default JitterVisual;
