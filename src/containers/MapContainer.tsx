import * as L from "leaflet";
import { MAP_TILES } from "@/constants/MapTiles";
import { MutableRefObject, useEffect, useRef } from "react";
import useDrawROIStore from "@/store/DrawROIStore";
import Map from "@/components/templates/Map";
import useTileLayerStore from "@/store/TileLayerStore";
import useGlobalStore from "@/store/GlobalStore";

type BoundingBox = { maxx: number; maxy: number; minx: number; miny: number };

type OverlayPNGToMap = {
  imageUrl: string;
  boundingBox: BoundingBox;
};

const MapContainer = () => {
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef: MutableRefObject<L.TileLayer | null> = useRef(null);
  const currentTileLayer = useTileLayerStore((state) => state.currentTileLayer);
  const isROIEnabled = useDrawROIStore((state) => state.isROIEnabled);
  const setROIEnable = useDrawROIStore((state) => state.setROIEnable);
  const currentDataCard = useGlobalStore((state) => state.currentDataCard);
  const dataCards = useGlobalStore((state) => state.dataCards);
  const setCurrentMap = useGlobalStore((state) => state.setCurrentMap);

  const mapParams: L.MapOptions = {
    center: [36, 127.5],
    zoom: 8,
    zoomControl: false,
  };

  // PNG 파일을 leaflet 맵에 overlay 한다.
  const toggleOverLayPNGToMap = ({
    imageUrl,
    boundingBox,
  }: OverlayPNGToMap) => {
    const imageBounds: L.LatLngBoundsLiteral = [
      [boundingBox.miny, boundingBox.minx],
      [boundingBox.maxy, boundingBox.maxx],
    ];

    const imageOverlay = L.imageOverlay(imageUrl, imageBounds);

    mapRef.current && imageOverlay.addTo(mapRef.current);
  };

  // PNG 파일의 zoom 레벨을 결정한다.
  const calculatePNGZoomLevel = (width: number) => {
    const scaleFactor = 500;
    return Math.log2(scaleFactor / width);
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
    // TODO: TypePredicates.ts로 predicate 코드 분리 필요
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    // TODO: TypePredicates.ts로 predicate 코드 분리 필요
    if (mapRef.current) {
      tileLayerRef.current = L.tileLayer(
        MAP_TILES[currentTileLayer].url,
        MAP_TILES[currentTileLayer].options
      ).addTo(mapRef.current);
    }
  }, [currentTileLayer]);

  // TODO: 렌더링을 위한 ImageOverlay의 객체 데이터도 전역에서 다루도록 한다.
  useEffect(() => {
    setCurrentMap(mapRef.current);
  }, []);

  return (
    <Map
      currentMap={mapRef.current}
      isROIEnabled={isROIEnabled}
      setROIEnable={setROIEnable}
    />
  );
};

export default MapContainer;
