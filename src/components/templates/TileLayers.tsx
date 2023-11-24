import { KIND_OF_MAP_TILES } from "@/constants/MapTiles";
import { UserTracker } from "@/domain/model/UserTracker";

type Props = {
  setCurrentTileLayer: (layer: KIND_OF_MAP_TILES) => void;
  handleMouseEnter: (e: React.MouseEvent) => void;
  handleMouseLeave: (e: React.MouseEvent) => void;
  layers: KIND_OF_MAP_TILES[];
  track: UserTracker["track"];
};

const TileLayers = ({
  setCurrentTileLayer,
  handleMouseEnter,
  handleMouseLeave,
  layers,
  track,
}: Props) => {
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
              track("tileLayers:tilelayer-button:click");
            }}
            role={layer}
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
