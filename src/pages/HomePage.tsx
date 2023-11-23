import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import TileLayers from "@/components/TileLayers";
import MapContainer from "@/containers/MapContainer";

const HomePage = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <NavBar />
      <SideBar />
      <TileLayers
        layers={["google_satellite", "leaflet_osm", "leaflet_dark"]}
      />
      <MapContainer />
    </div>
  );
};

export default HomePage;
