import { create } from "zustand";
import { KIND_OF_MAP_TILES } from "../constants/MapTiles";

export type SideBarOptionType =
  | null
  | "BookMark"
  | "Range Search"
  | "SAR"
  | "InSAR"
  | "Ship Detection"
  | "Bridge Detection"
  | "Water Detection"
  | "Earthquake Detection"
  | "Oilspill Detection";

interface GlobalState {
  isSideBarOpened: boolean;
  currentSideBarOption: SideBarOptionType;
  currentSideBarOptions: SideBarOptionType[];
  currentTileLayer: KIND_OF_MAP_TILES;
  toggleSideBarOpened: () => void;
  setCurrentSideBarOption: (currentSideBarOption: SideBarOptionType) => void;
  setCurrentTileLayer: (currentTileLayer: KIND_OF_MAP_TILES) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isSideBarOpened: false,
  currentSideBarOption: null,
  currentSideBarOptions: [],
  currentTileLayer: "google_satellite",
  toggleSideBarOpened: () =>
    set((state) => {
      return {
        isSideBarOpened: !state.isSideBarOpened,
        currentSideBarOption: null,
      };
    }),
  setCurrentSideBarOption: (currentSideBarOption) =>
    set({
      currentSideBarOption,
      isSideBarOpened: true,
    }),
  setCurrentTileLayer: (currentTileLayer) =>
    set({
      currentTileLayer,
    }),
}));

export default useGlobalStore;
