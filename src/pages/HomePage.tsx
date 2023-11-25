import MapContainer from "@/containers/MapContainer";
import NavBarContainer from "@/containers/NavBarContainer";
import SideBarContainer from "@/containers/SideBarContainer";
import TileLayersContainer from "@/containers/TileLayersContainer";

const HomePage = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <NavBarContainer />
      <SideBarContainer />
      <TileLayersContainer
        layers={["google_satellite", "leaflet_osm", "leaflet_dark"]}
      />
      <MapContainer />
    </div>
  );
};

export default HomePage;
