import React from "react";
import useMicAudio from "../../hooks/useMicAudio";
import Canvas from "../Canvas/Canvas";

function MFCCVisual ({ isRecording }) {
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

      // Compute MFCCs
      const sampleRate = analyser.context.sampleRate;
      const mfccs = computeMFCC(dataArray, fftSize, sampleRate);

      // Clear canvas
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      canvasContext.fillStyle = "#1e1e1e";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      // Visualize MFCCs as a heatmap
      const barWidth = canvas.width / mfccs.length;
      mfccs.forEach((mfcc, i) => {
        const barHeight = ((mfcc + 10) / 20) * canvas.height; // Normalize MFCC range
        canvasContext.fillStyle = `hsl(${180 - i * 10}, 70%, 50%)`;
        canvasContext.fillRect(
          i * barWidth,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight
        );
      });

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

const melFilterBank = (numFilters, fftSize, sampleRate) => {
  const melScale = (freq) => 2595 * Math.log10(1 + freq / 700); // Hertz to mel scale
  const melScaleInverse = (mel) => 700 * (Math.pow(10, mel / 2595) - 1); // Mel to Hertz

  const melMin = melScale(0);
  const melMax = melScale(sampleRate / 2);
  const melPoints = Array.from({ length: numFilters + 2 }, (_, i) =>
    melScaleInverse(melMin + (i / (numFilters + 1)) * (melMax - melMin))
  );

  const binPoints = melPoints.map((freq) =>
    Math.floor((freq / sampleRate) * fftSize)
  );

  const filters = Array.from(
    { length: numFilters },
    () => new Float32Array(fftSize / 2)
  );

  for (let i = 1; i < binPoints.length - 1; i++) {
    for (let j = binPoints[i - 1]; j <= binPoints[i]; j++) {
      filters[i - 1][j] =
        (j - binPoints[i - 1]) / (binPoints[i] - binPoints[i - 1]);
    }
    for (let j = binPoints[i]; j <= binPoints[i + 1]; j++) {
      filters[i - 1][j] =
        (binPoints[i + 1] - j) / (binPoints[i + 1] - binPoints[i]);
    }
  }

  return filters;
};

const computeMFCC = (data, fftSize, sampleRate, numCoefficients = 13) => {
  const fft = new Float32Array(fftSize);
  data.forEach((value, i) => (fft[i] = value));
  const magSpectrum = fft.map((val) => Math.abs(val)); // Magnitude spectrum

  const melFilters = melFilterBank(26, fftSize, sampleRate); // 26 Mel filters
  const melEnergies = melFilters.map((filter) =>
    filter.reduce((sum, weight, i) => sum + weight * magSpectrum[i], 0)
  );

  const logEnergies = melEnergies.map((energy) => Math.log10(energy + 1e-6)); // Add epsilon to avoid log(0)

  const mfccs = new Float32Array(numCoefficients);
  for (let i = 0; i < numCoefficients; i++) {
    mfccs[i] = logEnergies.reduce(
      (sum, logEnergy, m) =>
        sum +
        logEnergy * Math.cos((Math.PI * i * (m + 0.5)) / melEnergies.length),
      0
    );
  }

  return mfccs;
};

export default MFCCVisual;
