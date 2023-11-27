import { create } from "zustand";
import { KIND_OF_MAP_TILES } from "../constants/MapTiles";

interface TileLayerState {
  currentTileLayer: KIND_OF_MAP_TILES;
  setCurrentTileLayer: (currentTileLayer: KIND_OF_MAP_TILES) => void;
}

const useTileLayerStore = create<TileLayerState>((set) => ({
  currentTileLayer: "google_satellite",
  setCurrentTileLayer: (currentTileLayer) =>
    set({
      currentTileLayer,
    }),
}));

export default useTileLayerStore;
