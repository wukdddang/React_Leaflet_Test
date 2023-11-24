import { CategoryData } from "@/api/getDataByCategory";
import { SideBarOptionType } from "../store/SideBarStore";
import DataCard from "./templates/DataCard";

export type SideBarItemProps = {
  text: SideBarOptionType;
  icon: React.ReactElement;
  isHover: boolean;
  isSideBarOpened: boolean;
  isItemClicked: boolean;
  sideBarItemData?: CategoryData[];
  isLoading: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
};

const SideBarItem = ({
  text,
  icon,
  isHover,
  isSideBarOpened,
  isItemClicked,
  sideBarItemData,
  isLoading,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
}: SideBarItemProps) => {
  return (
    <>
      <div
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: isHover ? "lightblue" : "",
          transition: "0.2s ease",
          width: "100%",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div
          style={{
            display: "flex",
            width: "60px",
            height: "50px",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            whiteSpace: "nowrap",
            transition: "0.3s ease",
            opacity: !isSideBarOpened ? 0 : 1,
          }}
        >
          {text}
        </span>
      </div>
      <span
        style={{
          transition: "opacity 1s ease, max-height 0.7s ease",
          opacity: isItemClicked ? 1 : 0,
          maxHeight: isItemClicked
            ? sideBarItemData
              ? `${200 * sideBarItemData.length}px`
              : "0"
            : "0",
          overflow: "hidden",
          paddingLeft: "30px",
        }}
      >
        {sideBarItemData &&
          sideBarItemData.map((item) => {
            return (
              <DataCard isItemClicked={isItemClicked} sideBarItem={item} />
            );
          })}
      </span>
    </>
  );
};

export default SideBarItem;
