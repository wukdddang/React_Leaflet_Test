import { useRef, useState, useEffect } from "react";
import useDrawROIStore from "@/store/DrawROIStore";
import * as L from "leaflet";
import { ROICanvasType } from "@/types/ROICanvas";
import { isCurrentMapExist } from "@/types/TypePredicates";
import ROICanvas from "@/components/templates/ROICanvas";

const isContextRefExist = (
  context: CanvasRenderingContext2D | null
): context is CanvasRenderingContext2D => {
  return context !== null;
};

const isCanvasRefExist = (
  canvas: HTMLCanvasElement | null
): canvas is HTMLCanvasElement => {
  return canvas !== null;
};

const ROICanvasContainer = ({ currentMap }: ROICanvasType) => {
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
        context.strokeStyle = "dodgerblue";
        context.lineWidth = 1;
        contextRef.current = context;
      }

      const canvasOffSet = canvas.getBoundingClientRect();
      canvasOffSetX.current = canvasOffSet.top;
      canvasOffSetY.current = canvasOffSet.left;
    }
  }, []);

  const startDrawingRectangle = ({
    nativeEvent,
  }: {
    nativeEvent: MouseEvent;
  }) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    startX.current = nativeEvent.clientX - canvasOffSetX.current;
    startY.current = nativeEvent.clientY - canvasOffSetY.current;

    setIsDrawing(true);
  };

  const drawRectangle = ({ nativeEvent }: { nativeEvent: MouseEvent }) => {
    if (!isDrawing) {
      return;
    }

    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();

    const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
    const newMouseY = nativeEvent.clientY - canvasOffSetY.current;

    const rectWidth = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;

    if (
      isContextRefExist(contextRef.current) &&
      isCanvasRefExist(canvasRef.current) &&
      isCurrentMapExist(currentMap)
    ) {
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

      // ROI 배경색을 rgba(0, 0, 0, 0.3)으로 채운다.
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

    if (
      isContextRefExist(contextRef.current) &&
      isCanvasRefExist(canvasRef.current)
    )
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
  };

  return (
    <ROICanvas
      isROIEnabled={isROIEnabled}
      canvasRef={canvasRef}
      startDrawingRectangle={startDrawingRectangle}
      drawRectangle={drawRectangle}
      stopDrawingRectangle={stopDrawingRectangle}
    />
  );
};

export default ROICanvasContainer;
