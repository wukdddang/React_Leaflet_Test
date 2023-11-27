import * as L from "leaflet";
import { MAP_TILES } from "@/constants/MapTiles";
import React from "react";
import useDrawROIStore from "../store/DrawROIStore";
import Map from "@/components/templates/Map";
import useDataCardStore from "@/store/DataCardStore";
import useTileLayerStore from "@/store/TileLayerStore";

const MapContainer = () => {
  const mapRef = React.useRef<L.Map | null>(null);
  const tileLayerRef: React.MutableRefObject<L.TileLayer | null> =
    React.useRef(null);
  const currentTileLayer = useTileLayerStore((state) => state.currentTileLayer);
  const isROIEnabled = useDrawROIStore((state) => state.isROIEnabled);
  const setROIEnable = useDrawROIStore((state) => state.setROIEnable);
  const currentDataCard = useDataCardStore((state) => state.currentDataCard);

  const mapParams: L.MapOptions = {
    center: [36, 127.5],
    zoom: 8,
    zoomControl: false,
  };

  React.useEffect(() => {
    mapRef.current = L.map("map", mapParams);

    tileLayerRef.current = L.tileLayer(
      MAP_TILES[currentTileLayer].url,
      MAP_TILES[currentTileLayer].options
    ).addTo(mapRef.current);

    fetch("/assets/images/daecheong_preview.png").then((res) => {
      const imageBounds: L.LatLngBoundsLiteral = [
        [36.351759106173766, 127.48081498291273],
        [36.42983922705515, 127.55381729230828],
      ];

      mapRef.current &&
        L.imageOverlay(res.url, imageBounds).addTo(mapRef.current);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [mapRef]);

  React.useEffect(() => {
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    if (mapRef.current) {
      tileLayerRef.current = L.tileLayer(
        MAP_TILES[currentTileLayer].url,
        MAP_TILES[currentTileLayer].options
      ).addTo(mapRef.current);
    }
  }, [currentTileLayer]);

  // TODO: currentDataCard가 변경되면 Map에 추가할 수 있도록 로직 구성

  React.useEffect(() => {}, [currentDataCard]);

  return (
    <Map
      currentMap={mapRef.current}
      isROIEnabled={isROIEnabled}
      setROIEnable={setROIEnable}
    />
  );
};

export default MapContainer;
