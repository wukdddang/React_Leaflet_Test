import { KIND_OF_MAP_TILES } from "../constants/MapTiles";
import useGlobalStore from "../store/GlobalStore";

type TileLayersProps = {
  layers: KIND_OF_MAP_TILES[];
};

const TileLayers = ({ layers }: TileLayersProps) => {
  const setCurrentTileLayer = useGlobalStore(
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

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        right: "50px",
        bottom: "50px",
        zIndex: 1,
      }}
    >
      {layers.map((layer) => {
        return (
          <img
            key={layer}
            src={`/assets/images/${layer}.png`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              setCurrentTileLayer(layer);
            }}
            style={{
              height: "60px",
              width: "60px",
              padding: "3px",
              backgroundColor: "#fff",
              borderRadius: "3px",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
};

export default TileLayers;
