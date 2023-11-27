import { CSSProperties } from "react";
import ROICanvasContainer from "@/containers/ROICanvasContainer";
import MapButtons from "./MapButtons";

const mapStyles: CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

type Props = {
  currentMap: L.Map | null;
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
      />
      <ROICanvasContainer currentMap={currentMap} />
      <MapButtons
        currentMap={currentMap}
        isROIEnabled={isROIEnabled}
        setROIEnable={setROIEnable}
      />
    </>
  );
};

export default Map;
