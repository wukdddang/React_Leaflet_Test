import * as L from "leaflet";
import { MAP_TILES } from "@/constants/MapTiles";
import { MutableRefObject, useEffect, useRef } from "react";
import useDrawROIStore from "@/store/DrawROIStore";
import Map from "@/components/templates/Map";
import useTileLayerStore from "@/store/TileLayerStore";
import useGlobalStore from "@/store/GlobalStore";
import { isCurrentMapExist, isTileLayerExist } from "@/types/TypePredicates";
import useSideBarStore from "@/store/SideBarStore";

const MapContainer = () => {
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef: MutableRefObject<L.TileLayer | null> = useRef(null);
  const currentTileLayer = useTileLayerStore((state) => state.currentTileLayer);
  const isROIEnabled = useDrawROIStore((state) => state.isROIEnabled);
  const isSideBarOpened = useSideBarStore((state) => state.isSideBarOpened);
  const setROIEnable = useDrawROIStore((state) => state.setROIEnable);
  const setCurrentMap = useGlobalStore((state) => state.setCurrentMap);

  const mapParams: L.MapOptions = {
    center: [36, 127.5],
    zoom: 8,
    zoomControl: false,
  };

  useEffect(() => {
    mapRef.current = L.map("map", mapParams);

    tileLayerRef.current = L.tileLayer(
      MAP_TILES[currentTileLayer].url,
      MAP_TILES[currentTileLayer].options
    ).addTo(mapRef.current);

    setCurrentMap(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
    // eslint-disable-next-line
  }, [mapRef]);

  useEffect(() => {
    if (isTileLayerExist(tileLayerRef.current)) {
      tileLayerRef.current.remove();
    }

    if (isCurrentMapExist(mapRef.current)) {
      tileLayerRef.current = L.tileLayer(
        MAP_TILES[currentTileLayer].url,
        MAP_TILES[currentTileLayer].options
      ).addTo(mapRef.current);
    }
  }, [currentTileLayer]);

  useEffect(() => {
    setCurrentMap(mapRef.current);
  }, []);

  return (
    <Map
      currentMap={mapRef.current}
      isSideBarOpened={isSideBarOpened}
      isROIEnabled={isROIEnabled}
      setROIEnable={setROIEnable}
    />
  );
};

export default MapContainer;
