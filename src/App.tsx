import "leaflet/dist/leaflet.css";
import MapComponent from "./components/MapComponent";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import TileLayers from "./components/TileLayers";
import SideBar from "./components/SideBar";
import "leaflet/dist/leaflet.css";

function App() {
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
      <MapComponent />
    </div>
  );
}

export default App;
