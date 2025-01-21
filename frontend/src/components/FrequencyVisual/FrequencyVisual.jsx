import React from "react";
import useMicAudio from "../../hooks/useMicAudio";

const FrequencyVisual = ({ isRecording }) => {
  const canvasRef = React.useRef(null);
  const [audioContextRef, analyserRef] = useMicAudio();
  const animationFrameIdRef = React.useRef(null);

  React.useEffect(() => {
    function run() {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Get the audio input stream

      const draw = () => {
        analyser.getByteFrequencyData(dataArray);

        // Clear canvas
        canvasContext.fillStyle = "rgb(200, 200, 200)";
        // Clear the canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the frequency bars
        const barWidth = canvas.width / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const barHeight = dataArray[i]; // Magnitude of the frequency
          const color = `rgb(${barHeight + 100}, 50, 150)`; // Color based on magnitude
          canvasContext.fillStyle = color;
          canvasContext.fillRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight
          );
          x += barWidth;
        }
        animationFrameIdRef.current = requestAnimationFrame(draw);
      };
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
      style={{ border: "1px solid black" }}
    />
  );
};

export default FrequencyVisual;
