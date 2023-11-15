import "leaflet/dist/leaflet.css";
import MapLayer from "./components/MapComponent";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

function App() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "60px",
        }}
      >
        <NavBar />
      </div>
      <div
        style={{
          display: "flex",
          flex: "1",
          width: "100%",
          height: "100vh",
        }}
      >
        <SideBar />
        <MapLayer />
      </div>
    </section>
  );
}

export default App;
