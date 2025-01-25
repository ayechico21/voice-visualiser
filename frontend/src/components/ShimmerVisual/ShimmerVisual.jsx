import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function ShimmerVisual ({ isRecording }) {
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

      // Detect peak amplitudes
      const amplitudes = detectAmplitudes(dataArray);

      // Maintain a history of amplitudes for shimmer calculation
      if (!draw.amplitudeHistory) draw.amplitudeHistory = [];
      draw.amplitudeHistory.push(...amplitudes);

      // Limit to last 100 amplitudes
      if (draw.amplitudeHistory.length > 100) {
        draw.amplitudeHistory = draw.amplitudeHistory.slice(-100);
      }

      const shimmer = calculateShimmer(draw.amplitudeHistory);

      // Clear canvas
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      canvasContext.fillStyle = "#1e1e1e";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      // Draw shimmer visualization
      const barWidth = canvas.width / 3;
      const maxBarHeight = canvas.height / 2;

      // Shimmer bar
      const shimmerBarHeight = Math.min(shimmer * 1000, maxBarHeight); // Scale for display
      canvasContext.fillStyle = "rgba(100, 255, 100, 0.8)";
      canvasContext.fillRect(
        canvas.width / 2 - barWidth / 2,
        canvas.height - shimmerBarHeight - 20,
        barWidth,
        shimmerBarHeight
      );

      // Draw label
      canvasContext.fillStyle = "white";
      canvasContext.fillText(
        `Shimmer: ${(shimmer * 100).toFixed(2)}%`,
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

const detectAmplitudes = (data) =>  {
  // Detect peak amplitudes in each cycle
  const amplitudes = [];
  for (let i = 1; i < data.length - 1; i++) {
    if (data[i] > data[i - 1] && data[i] > data[i + 1]) {
      amplitudes.push(data[i]);
    }
  }
  return amplitudes;
}

const calculateShimmer = (amplitudeHistory) => {
  // Calculate shimmer as relative variation in consecutive amplitudes
  let shimmerSum = 0;
  let count = 0;

  for (let i = 1; i < amplitudeHistory.length; i++) {
    if (amplitudeHistory[i] > 0 && amplitudeHistory[i - 1] > 0) {
      shimmerSum +=
        Math.abs(amplitudeHistory[i] - amplitudeHistory[i - 1]) /
        amplitudeHistory[i - 1];
      count++;
    }
  }

  return count > 0 ? shimmerSum / count : 0;
}

export default ShimmerVisual;
