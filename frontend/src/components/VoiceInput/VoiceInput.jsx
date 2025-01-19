import React from "react";
import useMicAudio from "../../hooks/useMicAudio";

function VoiceInput() {
  const [audioContextRef, analyserRef] = useMicAudio();
  const animationFrameIdRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [isRecording, setIsRecording] = React.useState(false);

  React.useEffect(() => {
    console.log("useEffect called");
    function drawWaveform() {
      console.log("drawWaveform called");
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext("2d");
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw() {
        analyser.getByteTimeDomainData(dataArray);

        // Clear canvas
        canvasContext.fillStyle = "rgb(200, 200, 200)";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Draw waveform
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = "rgb(0, 0, 0)";
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

        animationFrameIdRef.current = requestAnimationFrame(draw);
      }

      draw();
    }
    if (isRecording) {
      drawWaveform();
    }
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isRecording, audioContextRef, analyserRef]);

  console.log("audioContextRef", audioContextRef.current);
  console.log("analyserRef", analyserRef.current);

  const toggleRecording = () => {
    setIsRecording((current) => !current);
  };

  return (
    <div>
      <h2>Voice Input Visualization</h2>
      <button onClick={toggleRecording}>
        {isRecording ? "Stop" : "Start Speaking"}
      </button>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
  );
}

export default VoiceInput;
