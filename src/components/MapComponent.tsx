import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CSSProperties, useEffect, useRef, useState } from "react";

const MAP_TILE = L.tileLayer(
  `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
);

const mapStyles: CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

interface Point {
  name: string;
  latLng: number[];
}

function MapLayer() {
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const [pointDatas, setPointDatas] = useState<Point[]>([]);

  const mapParams: L.MapOptions = {
    center: L.latLng(36, 128),
    zoom: 6,
    zoomControl: false,
    layers: [MAP_TILE],
  };

  const fetchPointDatas = async () => {
    const datas: Point[] = await fetch("./src/data.json").then((data) =>
      data.json()
    );
    setPointDatas(datas);
  };

  /**
   * 맵 레이어 렌더링
   *
   * Leaflet 공식문서에서는 지도 인스턴스의 remove() 메서드를 사용하여 map과 관련된 이벤트 리스너들을 제거하도록 권장한다.
   * 이렇게 하면 컴포넌트가 언마운트 될 때, 맵 인스턴스가 제대로 삭제된다.
   */

  useEffect(() => {
    fetchPointDatas();
    mapRef.current = L.map("map", mapParams);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  console.log(pointDatas);

  return (
    <div
      id="map"
      style={{
        ...mapStyles,
        position: "absolute",
        top: 0,
        zIndex: 0,
      }}
    ></div>
  );
}

export default MapLayer;
