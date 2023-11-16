import "leaflet/dist/leaflet.css";
import MapLayer from "./components/MapComponent";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ExampleOffcanvas from "./components/ExampleOffCanvas";

function App() {
  return (
    <>
      <NavBar />
      <ExampleOffcanvas />
      <MapLayer />
    </>
  );
}

export default App;
