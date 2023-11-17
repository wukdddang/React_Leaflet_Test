import { create } from "zustand";
import { KIND_OF_MAP_TILES } from "../constants/MapTiles";

interface GlobalState {
  isSideBarOpened: boolean;
  currentTileLayer: KIND_OF_MAP_TILES;
  setIsSideBarOpened: () => void;
  setCurrentTileLayer: (currentTileLayer: KIND_OF_MAP_TILES) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isSideBarOpened: false,
  currentTileLayer: "google_satellite",
  setIsSideBarOpened: () =>
    set((state) => ({ isSideBarOpened: !state.isSideBarOpened })),
  setCurrentTileLayer: (currentTileLayer) =>
    set({
      currentTileLayer,
    }),
}));

export default useGlobalStore;
