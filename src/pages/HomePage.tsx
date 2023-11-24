import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import MapContainer from "@/containers/MapContainer";
import TileLayersContainer from "@/containers/TileLayersContainer";

const HomePage = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <NavBar />
      <SideBar />
      <TileLayersContainer
        layers={["google_satellite", "leaflet_osm", "leaflet_dark"]}
      />
      <MapContainer />
    </div>
  );
};

export default HomePage;
