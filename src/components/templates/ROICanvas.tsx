type Props = {
  isROIEnabled: boolean;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  startDrawingRectangle: ({ nativeEvent }: { nativeEvent: MouseEvent }) => void;
  drawRectangle: ({ nativeEvent }: { nativeEvent: MouseEvent }) => void;
  stopDrawingRectangle: () => void;
};

const ROICanvas = ({
  isROIEnabled,
  canvasRef,
  startDrawingRectangle,
  drawRectangle,
  stopDrawingRectangle,
}: Props) => {
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
