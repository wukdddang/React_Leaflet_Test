import useSideBarStore from "@/store/SideBarStore";
import Button from "../molecules/Button";
import * as L from "leaflet";

type Props = {
  currentMap: L.Map | null;
  isROIEnabled: boolean;
  setROIEnable: (currentROI: boolean) => void;
};

const MapButtons = ({ currentMap, isROIEnabled, setROIEnable }: Props) => {
  const isSideBarOpened = useSideBarStore((state) => state.isSideBarOpened);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: isSideBarOpened ? "450px" : "100px",
        transition: "0.3s ease",
        display: "flex",
        gap: "10px",
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
  );
};

export default MapButtons;
