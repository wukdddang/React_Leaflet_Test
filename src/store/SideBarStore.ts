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

interface SideBarState {
  isSideBarOpened: boolean;
  currentSideBarOption: SideBarOptionType;
  clickedSideBarOptions: SideBarOptionType[];
  currentTileLayer: KIND_OF_MAP_TILES;
  toggleSideBarOpened: () => void;
  setCurrentSideBarOption: (currentSideBarOption: SideBarOptionType) => void;
  pushCurrentSideBarOption: (
    currentSideBarOption: SideBarOptionType,
    currentSideBarOptions: SideBarOptionType[]
  ) => void;
  setCurrentTileLayer: (currentTileLayer: KIND_OF_MAP_TILES) => void;
}

const useSideBarStore = create<SideBarState>((set) => ({
  isSideBarOpened: false,
  currentSideBarOption: null,
  clickedSideBarOptions: [],
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
  pushCurrentSideBarOption: (currentSideBarOption, clickedSideBarOptions) =>
    set({
      clickedSideBarOptions: [...clickedSideBarOptions, currentSideBarOption],
    }),
  setCurrentTileLayer: (currentTileLayer) =>
    set({
      currentTileLayer,
    }),
}));

export default useSideBarStore;
