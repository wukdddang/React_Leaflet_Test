import { CategoryData } from "@/api/getDataByCategory";
import { create } from "zustand";
import * as L from "leaflet";
import { isCurrentMapExist } from "@/types/TypePredicates";

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
  setCurrentDataCard: (dataCard: DataCardStoreType & ImageOverlayType) => void;
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
    set((state) =>
      state.currentDataCard?.title === dataCard.title
        ? { currentDataCard: undefined }
        : { currentDataCard: dataCard }
    );
  },
  toggleDataCards: (dataCard) => {
    set((state) => {
      const updatedDataCards = [...state.dataCards];
      const dataIdx = updatedDataCards
        .map((card) => card.title)
        .indexOf(dataCard.title);

      const toggledImageOverlay = updatedDataCards[dataIdx]?.imageOverlay;
      if (dataIdx !== -1 && toggledImageOverlay) {
        state.currentMap?.removeLayer(toggledImageOverlay);

        updatedDataCards.splice(dataIdx, 1);
      } else {
        const boundingBox = dataCard.content.boundingBox;
        const imageBounds: L.LatLngBoundsLiteral = [
          [boundingBox.miny, boundingBox.minx],
          [boundingBox.maxy, boundingBox.maxx],
        ];
        const toggledImageOverlay = L.imageOverlay(
          dataCard.content.imageUrl,
          imageBounds
        );

        // dataCard 프로퍼티에 leaflet 객체 주입
        dataCard.imageOverlay = toggledImageOverlay;

        if (isCurrentMapExist(state.currentMap)) {
          toggledImageOverlay.addTo(state.currentMap);
        }
        updatedDataCards.push(dataCard);
      }

      return { dataCards: updatedDataCards };
    });
  },
}));

export default useGlobalStore;
