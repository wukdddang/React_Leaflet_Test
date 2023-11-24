import TileLayers from "@/components/templates/TileLayers";
import { KIND_OF_MAP_TILES } from "@/constants/MapTiles";
import useSideBarStore from "@/store/SideBarStore";

type TileLayersProps = {
  layers: KIND_OF_MAP_TILES[];
};

const TileLayersContainer = ({ layers }: TileLayersProps) => {
  const setCurrentTileLayer = useSideBarStore(
    (state) => state.setCurrentTileLayer
  );
  const handleMouseEnter = (e: React.MouseEvent) => {
    const img = e.target as HTMLImageElement;
    img.classList.add("enlarged");
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const img = e.target as HTMLImageElement;
    img.classList.remove("enlarged");
  };

  const tileLayerLog = () => {
    console.log("tile changed");
  };

  return (
    <TileLayers
      setCurrentTileLayer={setCurrentTileLayer}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      layers={layers}
      track={tileLayerLog}
    />
  );
};

export default TileLayersContainer;
