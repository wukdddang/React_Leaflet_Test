import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { BsBookmarks, BsBoundingBoxCircles } from "react-icons/bs";
import {
  BiSolidAnalyse,
  BiObjectsHorizontalCenter,
  BiWater,
} from "react-icons/bi";
import { WiEarthquake } from "react-icons/wi";
import { SlMap } from "react-icons/sl";
import { FaShip } from "react-icons/fa6";
import { IoColorFillOutline } from "react-icons/io5";
import SideBarItem from "./SideBarItem";
import useGlobalStore from "../store/GlobalStore";
import DataCard from "./SideBarItem/DataCard";

const SideBar = () => {
  const isSideBarOpened = useGlobalStore((state) => state.isSideBarOpened);
  const toggleSideBarOpened = useGlobalStore(
    (state) => state.toggleSideBarOpened
  );

  const handleToggleSideBar = (e: React.MouseEvent) => {
    (e.target as HTMLElement).classList.toggle("open-sidebar");
  };

  return (
    <nav
      className="bg-white h-100 position-fixed"
      style={{
        width: !isSideBarOpened ? "60px" : "300px",
        left: 0,
        zIndex: 1,
        transition: "0.3s ease",
        overflowY: "scroll",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "70px",
          right: "10px",
          cursor: "pointer",
        }}
        onClick={(e) => {
          toggleSideBarOpened();
          handleToggleSideBar(e);
        }}
        className={`btn ${
          isSideBarOpened ? "btn-outline-primary" : "btn-primary"
        }`}
      >
        {!isSideBarOpened ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "130px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <SideBarItem
          text="BookMark"
          icon={<BsBookmarks size={20} role="BookMark" />}
        >
          <DataCard text="BookMark" />
        </SideBarItem>
        <SideBarItem
          text="Range Search"
          icon={<BsBoundingBoxCircles size={20} role="RangeSearch" />}
        >
          <DataCard text="Range Search" />
        </SideBarItem>
        <SideBarItem text="SAR" icon={<SlMap size={20} role="SAR" />}>
          {"hi"}
        </SideBarItem>
        <SideBarItem text="InSAR" icon={<BiSolidAnalyse size={20} />}>
          {"hi"}
        </SideBarItem>
        <SideBarItem text="Ship Detection" icon={<FaShip size={20} />}>
          {"hi"}
        </SideBarItem>
        <SideBarItem
          text="Bridge Detection"
          icon={<BiObjectsHorizontalCenter size={20} />}
        >
          {"hi"}
        </SideBarItem>
        <SideBarItem text="Water Detection" icon={<BiWater size={20} />}>
          {"hi"}
        </SideBarItem>
        <SideBarItem
          text="Earthquake Detection"
          icon={<WiEarthquake size={20} />}
        >
          {"hi"}
        </SideBarItem>
        <SideBarItem
          text="Oilspill Detection"
          icon={<IoColorFillOutline size={20} />}
        >
          {"hi"}
        </SideBarItem>
      </div>
    </nav>
  );
};

export default SideBar;
