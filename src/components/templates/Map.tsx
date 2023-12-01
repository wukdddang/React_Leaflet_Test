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
  isSideBarOpened: boolean;
  isROIEnabled: boolean;
  setROIEnable: (currentROI: boolean) => void;
};

const Map = ({
  currentMap,
  isSideBarOpened,
  isROIEnabled,
  setROIEnable,
}: Props) => {
  return (
    <>
      <div
        id="map"
        style={{
          ...mapStyles,
          position: "relative",
          transition: "0.3s ease",
          left: isSideBarOpened ? "200px" : 0,
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
