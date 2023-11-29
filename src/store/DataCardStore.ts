// TODO: 파일명 변경이 필요할 것 같다.?
import { CategoryData } from "@/api/getDataByCategory";
import { create } from "zustand";
import * as L from "leaflet";

export type DataCardStoreType = {
  title: string;
  content: CategoryData;
};

type ImageOverlayType = {
  imageOverlay: L.ImageOverlay;
};

type DataCardState = {
  currentDataCard?: DataCardStoreType;
  dataCards: DataCardStoreType[];
  setCurrentDataCard: (dataCard: DataCardStoreType) => void;
  toggleDataCards: (dataCard: DataCardStoreType) => void;
};

const useDataCardStore = create<DataCardState>((set) => ({
  dataCards: [],
  setCurrentDataCard: (dataCard) => {
    set((state) => {
      if (state.currentDataCard?.title === dataCard.title) {
        return { currentDataCard: undefined };
      } else {
        return {
          currentDataCard: dataCard,
        };
      }
    });
  },
  toggleDataCards: (dataCard) => {
    set((state) => {
      const updatedDataCards = [...state.dataCards];
      const dataIdx = updatedDataCards
        .map((card) => card.title)
        .indexOf(dataCard.title);

      if (dataIdx !== -1) {
        updatedDataCards.splice(dataIdx, 1);
      } else {
        updatedDataCards.push(dataCard);
      }

      return { dataCards: updatedDataCards };
    });
  },
}));

export default useDataCardStore;
