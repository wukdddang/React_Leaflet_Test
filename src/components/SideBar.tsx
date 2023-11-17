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
import SideBarItem from "./SideBar/SideBarItem";
import useGlobalStore from "../store/GlobalStore";

const SideBar = () => {
  // console.log(document.body.scrollWidth);
  const isSideBarOpened = useGlobalStore((state) => state.isSideBarOpened);
  const setIsSideBarOpened = useGlobalStore(
    (state) => state.setIsSideBarOpened
  );

  const handleToggleSideBar = (e: React.MouseEvent) => {
    e.target.classList.toggle("open-sidebar");
  };

  return (
    <nav
      className="bg-white h-100 position-fixed"
      style={{
        width: !isSideBarOpened ? "60px" : "300px",
        left: 0,
        zIndex: 1,
        transition: "0.3s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={(e) => {
          setIsSideBarOpened();
          handleToggleSideBar(e);
        }}
      >
        {!isSideBarOpened ? <FaChevronRight /> : <FaChevronLeft />}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "",
          position: "absolute",
          top: "100px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <SideBarItem text="BookMark">
          <BsBookmarks size={20} />
        </SideBarItem>
        <SideBarItem text="Range Search">
          <BsBoundingBoxCircles size={20} />
        </SideBarItem>
        <SideBarItem text="SAR">
          <SlMap size={20} />
        </SideBarItem>
        <SideBarItem text="InSAR">
          <BiSolidAnalyse size={20} />
        </SideBarItem>
        <SideBarItem text="Ship Detection">
          <FaShip size={20} />
        </SideBarItem>
        <SideBarItem text="Bridge Detection">
          <BiObjectsHorizontalCenter size={20} />
        </SideBarItem>
        <SideBarItem text="Water Detection">
          <BiWater size={20} />
        </SideBarItem>
        <SideBarItem text="Earthquake Detection">
          <WiEarthquake size={20} />
        </SideBarItem>
        <SideBarItem text="Oilspill Detection">
          <IoColorFillOutline size={20} />
        </SideBarItem>
      </div>
    </nav>
  );
};

export default SideBar;
