import { KINDOF_MAP_TILES } from '../constants/MapTiles';

type TileLayersProps = {
  layers: KINDOF_MAP_TILES[];
  changeTileLayer: (layer: KINDOF_MAP_TILES) => void;
};

const TileLayers = ({ layers, changeTileLayer }: TileLayersProps) => {
  const handleMouseEnter = (e: React.MouseEvent) => {
    const img = e.target as HTMLImageElement;
    img.classList.add('enlarged');
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const img = e.target as HTMLImageElement;
    img.classList.remove('enlarged');
  };

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        right: '20px',
        bottom: '50px',
        zIndex: 2,
      }}
    >
      {layers.map((layer) => {
        return (
          <img
            key={layer}
            src={`./src/assets/images/${layer}.png`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              changeTileLayer(layer);
            }}
            style={{
              height: '60px',
              width: '60px',
              padding: '3px',
              backgroundColor: '#fff',
              borderRadius: '3px',
              cursor: 'pointer',
              transition: '0.3s ease',
            }}
          />
        );
      })}
    </div>
  );
};

export default TileLayers;
