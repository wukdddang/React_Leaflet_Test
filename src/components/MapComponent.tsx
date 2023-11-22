import * as L from "leaflet";
import { CSSProperties, useEffect, useRef } from "react";
import { MAP_TILES } from "../constants/MapTiles";
import useGlobalStore from "../store/GlobalStore";
import ROICanvas from "./ROICanvas";
import useDrawROIStore from "../store/DrawROIStore";

const mapStyles: CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

function MapComponent() {
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef: React.MutableRefObject<L.TileLayer | null> = useRef(null);
  const currentTileLayer = useGlobalStore((state) => state.currentTileLayer);
  const isROIEnabled = useDrawROIStore((state) => state.isROIEnabled);
  const setROIEnable = useDrawROIStore((state) => state.setROIEnable);

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
  }, [mapRef.current]);

  useEffect(() => {
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

  return (
    <>
      <div
        id="map"
        style={{
          ...mapStyles,
          position: "relative",
          top: 0,
          zIndex: 0,
        }}
      ></div>
      <ROICanvas currentMap={mapRef.current} />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "100px",
          transition: "0.3s ease",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() => {
            if (isROIEnabled) {
              mapRef.current?.dragging.enable();
              setROIEnable(false);
            } else {
              mapRef.current?.dragging.disable();
              setROIEnable(true);
            }
          }}
        >
          {isROIEnabled ? "Enable Pan" : "Disable Pan"}
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            setROIEnable(true);
          }}
        >
          Draw ROI
        </button>
        <button
          onClick={() => {
            fetch("/data/groups?page=1&limit=10");
          }}
        >
          GET PNG By MSW
        </button>
      </div>
    </>
  );
}

export default MapComponent;
