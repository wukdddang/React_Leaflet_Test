import { CSSProperties } from "react";
import ROICanvas from "@/components/ROICanvas";
import Button from "@/components/molecules/Button";

const mapStyles: CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

type Props = {
  currentMap: L.Map;
  isROIEnabled: boolean;
  setROIEnable: (currentROI: boolean) => void;
};

const Map = ({ currentMap, isROIEnabled, setROIEnable }: Props) => {
  return (
    <>
      <div
        id="map"
        style={{
          ...mapStyles,
          position: "relative",
          top: 0,
          zIndex: 0,
        }}
      ></div>
      <ROICanvas currentMap={currentMap} />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "100px",
          transition: "0.3s ease",
        }}
      >
        <Button
          className="btn btn-primary"
          onClick={() => {
            if (isROIEnabled) {
              currentMap?.dragging.enable();
              setROIEnable(false);
            } else {
              currentMap?.dragging.disable();
              setROIEnable(true);
            }
          }}
        >
          {isROIEnabled ? "Enable Pan" : "Disable Pan"}
        </Button>
        <Button
          className="btn btn-success"
          onClick={() => {
            setROIEnable(true);
          }}
        >
          Draw ROI
        </Button>
      </div>
    </>
  );
};

export default Map;
