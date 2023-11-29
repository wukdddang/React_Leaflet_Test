import { CategoryData } from "@/api/getDataByCategory";
import { create } from "zustand";
import * as L from "leaflet";

interface DrawROIState {
  isROIEnabled: boolean;
  setROIEnable: (isROIEnabled: boolean) => void;
}

export type DataCardStoreType = {
  title: string;
  content: CategoryData;
};

type ImageOverlayType = {
  imageOverlay?: L.ImageOverlay;
};

interface GlobalState extends DrawROIState {
  currentMap: L.Map | null;
  setCurrentMap: (currentMap: L.Map | null) => void;
  currentDataCard?: DataCardStoreType & ImageOverlayType;
  dataCards: (DataCardStoreType & ImageOverlayType)[];
  setCurrentDataCard: (dataCard: DataCardStoreType) => void;
  toggleDataCards: (dataCard: DataCardStoreType & ImageOverlayType) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isROIEnabled: false,
  currentMap: null,
  setCurrentMap: (currentMap) =>
    set(() => {
      return { currentMap: currentMap };
    }),
  setROIEnable: (isROIEnabled) =>
    set(() => {
      return {
        isROIEnabled: isROIEnabled,
      };
    }),
  dataCards: [],
  setCurrentDataCard: (dataCard) => {
    set((state) => {
      if (state.currentDataCard?.title === dataCard.title) {
        return { currentDataCard: undefined };
      } else {
        return { currentDataCard: dataCard };
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
        state.currentMap?.removeLayer(updatedDataCards[dataIdx].imageOverlay);

        updatedDataCards.splice(dataIdx, 1);
      } else {
        const boundingBox = dataCard.content.boundingBox;
        const imageBounds: L.LatLngBoundsLiteral = [
          [boundingBox.miny, boundingBox.minx],
          [boundingBox.maxy, boundingBox.maxx],
        ];
        const imageOverlay = L.imageOverlay(
          dataCard.content.imageUrl,
          imageBounds
        );

        dataCard.imageOverlay = imageOverlay;
        imageOverlay.addTo(state.currentMap);
        updatedDataCards.push(dataCard);
      }

      return { dataCards: updatedDataCards };
    });
  },
}));

export default useGlobalStore;
