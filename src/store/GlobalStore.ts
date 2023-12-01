import { CategoryData } from "@/api/getDataByCategory";
import { create } from "zustand";
import * as L from "leaflet";
import { isCurrentMapExist } from "@/types/TypePredicates";

interface DrawROIState {
  isROIEnabled: boolean;
  setROIEnable: (isROIEnabled: boolean) => void;
}

interface ModalState {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export type DataCardStoreType = {
  title: string;
  content: CategoryData;
};

type ImageOverlayType = {
  imageOverlay?: L.ImageOverlay;
};

interface GlobalState extends DrawROIState, ModalState {
  currentMap: L.Map | null;
  setCurrentMap: (currentMap: L.Map | null) => void;
  currentDataCard?: DataCardStoreType & ImageOverlayType;
  dataCards: (DataCardStoreType & ImageOverlayType)[];
  setCurrentDataCard: (dataCard: DataCardStoreType & ImageOverlayType) => void;
  toggleDataCards: (dataCard: DataCardStoreType & ImageOverlayType) => void;
  clearDataCards: () => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isROIEnabled: false,
  showModal: false,
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
  setShowModal: () =>
    set((state) => {
      return {
        showModal: !state.showModal,
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

      // PNG 파일의 zoom 레벨을 결정한다.
      const calculatePNGZoomLevel = (width: number) => {
        const scaleFactor = 250;
        return Math.log2(scaleFactor / width);
      };

      const toggledImageOverlay = updatedDataCards[dataIdx]?.imageOverlay;

      if (dataIdx !== -1 && toggledImageOverlay) {
        state.currentMap?.removeLayer(toggledImageOverlay);

        updatedDataCards.splice(dataIdx, 1);
      } else {
        const { minx, maxx, miny, maxy } = dataCard.content.boundingBox;

        const imageBounds: L.LatLngBoundsLiteral = [
          [miny, minx],
          [maxy, maxx],
        ];

        const toggledImageOverlay = L.imageOverlay(
          dataCard.content.imageUrl,
          imageBounds
        );

        // dataCard 프로퍼티에 leaflet 객체 할당
        dataCard.imageOverlay = toggledImageOverlay;

        // currentMap이 있는 경우에만 ImageOverlay 적용
        if (isCurrentMapExist(state.currentMap)) {
          toggledImageOverlay.addTo(state.currentMap);
          state.currentMap.setView(
            [(miny + maxy) / 2, (minx + maxx) / 2],
            calculatePNGZoomLevel(maxx - minx)
          );
        }
        updatedDataCards.push(dataCard);
      }

      return { dataCards: updatedDataCards };
    });
  },

  clearDataCards: () => {
    set((state) => {
      state.dataCards.forEach((dataCard) => {
        // currentMap이 존재하고, imageOverlay가 존재하는지 체크
        if (isCurrentMapExist(state.currentMap) && dataCard.imageOverlay) {
          state.currentMap?.removeLayer(dataCard.imageOverlay);
        }
      });

      return { dataCards: [] };
    });
  },
}));

export default useGlobalStore;
