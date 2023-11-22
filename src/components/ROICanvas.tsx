import { useRef, useState, useEffect } from "react";
import useDrawROIStore from "../store/DrawROIStore";
import * as L from "leaflet";

type ROICanvas = {
  currentMap: L.Map | null;
};

const ROICanvas = ({ currentMap }: ROICanvas) => {
  const isROIEnabled = useDrawROIStore((state) => state.isROIEnabled);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const canvasOffSetX = useRef(0);
  const canvasOffSetY = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
        context.strokeStyle = "#652484";
        context.lineWidth = 2;
        contextRef.current = context;
      }

      const canvasOffSet = canvas.getBoundingClientRect();
      canvasOffSetX.current = canvasOffSet.top;
      canvasOffSetY.current = canvasOffSet.left;
    }
  }, []);

  const startDrawingRectangle = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    startX.current = nativeEvent.clientX - canvasOffSetX.current;
    startY.current = nativeEvent.clientY - canvasOffSetY.current;

    setIsDrawing(true);
  };

  const drawRectangle = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
    const newMouseY = nativeEvent.clientY - canvasOffSetY.current;

    const rectWidth = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;

    if (contextRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      contextRef.current.fillStyle = "rgba(0, 0, 0, 0.3)";
      // Draw the rectangle path
      contextRef.current.beginPath();
      contextRef.current.rect(
        startX.current,
        startY.current,
        rectWidth,
        rectHeight
      );

      // Fill the rectangle with the semi-transparent black
      contextRef.current.fill();

      contextRef.current.strokeRect(
        startX.current,
        startY.current,
        rectWidth,
        rectHeight
      );

      console.log(startX.current, startY.current, rectWidth, rectHeight);
      console.log(
        currentMap.layerPointToLatLng(L.point(startX.current, startY.current)),
        currentMap.layerPointToLatLng(
          L.point(startX.current + rectWidth, startY.current + rectHeight)
        )
      );
    }
  };

  const stopDrawingRectangle = () => {
    setIsDrawing(false);

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        display: isROIEnabled ? "" : "none",
      }}
    >
      <canvas
        className="canvas-container-rect"
        ref={canvasRef}
        onMouseDown={startDrawingRectangle}
        onMouseMove={drawRectangle}
        onMouseUp={stopDrawingRectangle}
        onMouseLeave={stopDrawingRectangle}
      ></canvas>
    </div>
  );
};

export default ROICanvas;
