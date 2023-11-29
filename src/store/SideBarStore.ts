import { create } from "zustand";

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
  toggleSideBarOpened: () => void;
  setCurrentSideBarOption: (currentSideBarOption: SideBarOptionType) => void;
  pushCurrentSideBarOption: (
    currentSideBarOption: SideBarOptionType,
    currentSideBarOptions: SideBarOptionType[]
  ) => void;
}

const useSideBarStore = create<SideBarState>((set) => ({
  isSideBarOpened: false,
  currentSideBarOption: null,
  clickedSideBarOptions: [],
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
}));

export default useSideBarStore;
