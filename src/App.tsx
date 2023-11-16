import 'leaflet/dist/leaflet.css';
import MapComponent from './components/MapComponent';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TileLayers from './components/TileLayers';
import { useState } from 'react';
import { KINDOF_MAP_TILES } from './constants/MapTiles';

function App() {
  const [currentTileLayer, setCurrentTileLayer] =
    useState<KINDOF_MAP_TILES>('google_satellite');

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <NavBar />
      <TileLayers
        layers={['google_satellite', 'leaflet_osm']}
        changeTileLayer={setCurrentTileLayer}
      />
      <MapComponent currentTileLayer={currentTileLayer} />
    </div>
  );
}

export default App;
