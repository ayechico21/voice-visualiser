import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

const AmplitudeVisual = ({ isRecording }) => {
  const canvasRef = React.useRef(null);
  const { audioContextRef, analyserRef, isMicInitialized } = useMicAudio({isRecording});
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
        analyser.getByteTimeDomainData(dataArray);

        // Clear canvas with a gradient background
        const gradient = canvasContext.createLinearGradient(
          0,
          0,
          0,
          canvas.height
        );
        gradient.addColorStop(0, "#1e3c72"); // Top color
        gradient.addColorStop(1, "#2a5298"); // Bottom color
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Draw waveform with smoother lines and dynamic colors
        canvasContext.lineWidth = 3;
        canvasContext.strokeStyle = "rgba(255, 255, 255, 0.9)"; // Slightly transparent white line
        canvasContext.beginPath();

        const sliceWidth = canvas.width / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] / 128.0; // Scale to range [0, 1]
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();

        // Add glowing effect to the waveform
        canvasContext.shadowBlur = 15;
        canvasContext.shadowColor = "rgba(255, 255, 255, 0.8)";
        canvasContext.stroke();

        // Reset shadow to avoid affecting other drawings
        canvasContext.shadowBlur = 0;

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
  }, [audioContextRef, analyserRef, isRecording, isMicInitialized]);

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

export default AmplitudeVisual;
