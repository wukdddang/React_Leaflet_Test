import { create } from "zustand";

interface DrawROIState {
  isROIEnabled: boolean;
  setROIEnable: (isROIEnabled: boolean) => void;
}

const useDrawROIStore = create<DrawROIState>((set) => ({
  isROIEnabled: false,
  setROIEnable: (isROIEnabled) =>
    set(() => {
      return {
        isROIEnabled: isROIEnabled,
      };
    }),
}));

export default useDrawROIStore;
