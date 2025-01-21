import React from "react";
import useMicAudio from "../../hooks/useMicAudio";

const SignalEneryVisual = ({ isRecording }) => {
  const canvasRef = React.useRef(null);
  const [audioContextRef, analyserRef] = useMicAudio();
  const animationFrameIdRef = React.useRef(null);
  const volumeHistoryRef = React.useRef([]); // Keep track of volume history

  React.useEffect(() => {
    function run() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      

      function draw() {
        analyser.getByteTimeDomainData(dataArray);

        // Calculate RMS and update volume history
        const rms = calculateRMS(dataArray);
        const volumeHistory = volumeHistoryRef.current;

        // Keep only the last 100 values to show a rolling trend
        volumeHistory.push(rms);
        if (volumeHistory.length > 100) {
          volumeHistory.shift();
        }

        // Clear the canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the graph background
        canvasContext.fillStyle = "rgba(30, 30, 30, 1)";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the grid
        canvasContext.strokeStyle = "rgba(100, 100, 100, 0.5)";
        canvasContext.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += canvas.width / 10) {
          canvasContext.beginPath();
          canvasContext.moveTo(i, 0);
          canvasContext.lineTo(i, canvas.height);
          canvasContext.stroke();
        }

        // Draw the volume trend
        canvasContext.strokeStyle = "rgba(0, 255, 0, 0.8)";
        canvasContext.lineWidth = 2;
        canvasContext.beginPath();

        const sliceWidth = canvas.width / volumeHistory.length;
        let x = 0;

        for (let i = 0; i < volumeHistory.length; i++) {
          const y = canvas.height - volumeHistory[i] * canvas.height; // Scale RMS to canvas height
          if (i === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }
          x += sliceWidth;
        }

        canvasContext.stroke();

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
    <canvas
      ref={canvasRef}
      width="600"
      height="300"
      style={{
        border: "2px solid #555",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#1e1e1e",
      }}
    />
  );
};

const calculateRMS = (dataArray) => {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const value = (dataArray[i] - 128) / 128; // Normalize to range [-1, 1]
    sum += value * value; // Square the amplitude
  }
  return Math.sqrt(sum / dataArray.length); // Return the RMS
};

export default SignalEneryVisual;
