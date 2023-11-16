import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CSSProperties, useEffect, useRef } from 'react';
import { KINDOF_MAP_TILES, MAP_TILES } from '../constants/MapTiles';

const mapStyles: CSSProperties = {
  overflow: 'hidden',
  width: '100%',
  height: '100%',
};

function MapComponent({
  currentTileLayer,
}: {
  currentTileLayer: KINDOF_MAP_TILES;
}) {
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  const mapParams: L.MapOptions = {
    center: L.latLng(36, 128),
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
   *
   * Leaflet 공식문서에서는 지도 인스턴스의 remove() 메서드를 사용하여 map과 관련된 이벤트 리스너들을 제거하도록 권장한다.
   * 이렇게 하면 컴포넌트가 언마운트 될 때, 맵 인스턴스가 제대로 삭제된다.
   */

  useEffect(() => {
    mapRef.current = L.map('map', {
      ...mapParams,
      layers: [
        L.tileLayer(
          MAP_TILES[currentTileLayer].url,
          MAP_TILES[currentTileLayer].options
        ),
      ],
    });
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [currentTileLayer, mapParams]);

  return (
    <div
      id="map"
      style={{
        ...mapStyles,
        position: 'relative',
        top: 0,
        zIndex: 0,
      }}
    ></div>
  );
}

export default MapComponent;
