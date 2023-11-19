import * as L from "leaflet";
import { CSSProperties, useEffect, useRef } from "react";
import { MAP_TILES } from "../constants/MapTiles";
import useGlobalStore from "../store/GlobalStore";

const mapStyles: CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

function MapComponent() {
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef: React.MutableRefObject<L.TileLayer | null> = useRef(null);
  const currentTileLayer = useGlobalStore((state) => state.currentTileLayer);

  const mapParams: L.MapOptions = {
    center: [36, 128],
    zoom: 8,
    zoomControl: false,
    layers: [
      L.tileLayer(
        MAP_TILES[currentTileLayer].url,
        MAP_TILES[currentTileLayer].options
      ),
    ],
  };

  /**
   * 맵 레이어 렌더링
   * Leaflet 공식문서에서는 지도 인스턴스의 remove() 메서드를 사용하여 map과 관련된 이벤트 리스너들을 제거하도록 권장한다.
   * 이렇게 하면 컴포넌트가 언마운트 될 때, 맵 인스턴스가 제대로 삭제된다.
   */

  useEffect(() => {
    mapRef.current = L.map("map", mapParams);

    tileLayerRef.current = L.tileLayer(
      MAP_TILES[currentTileLayer].url,
      MAP_TILES[currentTileLayer].options
    ).addTo(mapRef.current);

    fetch("/assets/images/daecheong_preview.png").then((res) => {
      console.log(res);
      const imageBounds: L.LatLngBoundsLiteral = [
        [36.351759106173766, 127.48081498291273],
        [36.42983922705515, 127.55381729230828],
      ];
      L.imageOverlay(res.url, imageBounds).addTo(mapRef.current);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    tileLayerRef.current = L.tileLayer(
      MAP_TILES[currentTileLayer].url,
      MAP_TILES[currentTileLayer].options
    ).addTo(mapRef.current);
  }, [currentTileLayer]);

  return (
    <div
      id="map"
      style={{
        ...mapStyles,
        position: "relative",
        top: 0,
        zIndex: 0,
      }}
    ></div>
  );
}

export default MapComponent;
