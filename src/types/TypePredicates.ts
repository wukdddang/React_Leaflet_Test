import { ROICanvasType } from "./ROICanvas";
import * as L from "leaflet";

export const isCurrentMapExist = (
  currentMap: ROICanvasType[keyof ROICanvasType]
): currentMap is L.Map => {
  return currentMap !== null;
};

export const isTileLayerExist = () => {};
