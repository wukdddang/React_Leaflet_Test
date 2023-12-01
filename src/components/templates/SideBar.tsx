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
import SideBarItemContainer from "@/containers/SideBarItemContainer";

type Props = {
  isSideBarOpened: boolean;
  toggleSideBarOpened: () => void;
  handleToggleSideBar: (e: React.MouseEvent) => void;
};

const SideBar = ({
  isSideBarOpened,
  toggleSideBarOpened,
  handleToggleSideBar,
}: Props) => {
  return (
    <nav
      className="bg-white h-100 position-fixed"
      style={{
        width: !isSideBarOpened ? "60px" : "400px",
        left: 0,
        zIndex: 1,
        transition: "0.3s ease",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          position: "sticky",
          background: "#fff",
          zIndex: 2,
          top: "60px",
          height: "60px",
          width: "100%",
        }}
      >
        <button
          style={{
            position: "absolute",
            cursor: "pointer",
            top: "10px",
            right: "10px",
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "130px",
          width: "100%",
        }}
      >
        {/* SideBar의 각 Item들을 렌더링하는 SideBarItemContainer 컴포넌트 */}
        <SideBarItemContainer
          text="BookMark"
          icon={<BsBookmarks size={20} role="BookMark" />}
        />
        <SideBarItemContainer
          text="Range Search"
          icon={<BsBoundingBoxCircles size={20} role="RangeSearch" />}
        />
        <SideBarItemContainer
          text="SAR"
          icon={<SlMap size={20} role="SAR" />}
        />
        <SideBarItemContainer
          text="InSAR"
          icon={<BiSolidAnalyse size={20} role="InSAR" />}
        />
        <SideBarItemContainer
          text="Ship Detection"
          icon={<FaShip size={20} role="ShipDetection" />}
        />
        <SideBarItemContainer
          text="Bridge Detection"
          icon={<BiObjectsHorizontalCenter size={20} role="BridgeDetection" />}
        />
        <SideBarItemContainer
          text="Water Detection"
          icon={<BiWater size={20} role="WaterDetection" />}
        />
        <SideBarItemContainer
          text="Earthquake Detection"
          icon={<WiEarthquake size={20} role="EarthquakeDetection" />}
        />
        <SideBarItemContainer
          text="Oilspill Detection"
          icon={<IoColorFillOutline size={20} role="Oilspill Detection" />}
        />
      </div>
    </nav>
  );
};

export default SideBar;
