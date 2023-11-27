import { CategoryData } from "@/api/getDataByCategory";
import { create } from "zustand";

type DataCardStoreType = {
  title: string;
  content: CategoryData;
};

type DataCardState = {
  currentDataCard?: DataCardStoreType;
  dataCards: DataCardStoreType[];
  setCurrentDataCard: (dataCard: DataCardStoreType) => void;
  pushDataCards: (dataCard: DataCardStoreType) => void;
};

const useDataCardStore = create<DataCardState>((set) => ({
  dataCards: [],
  setCurrentDataCard: (dataCard) =>
    set({
      currentDataCard: dataCard,
    }),
  pushDataCards: (dataCard) => {
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
