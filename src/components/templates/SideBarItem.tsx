import { CategoryData } from "@/api/getDataByCategory";
import { SideBarOptionType } from "../../store/SideBarStore";
import { BiChevronRight } from "react-icons/bi";
import DataCardContainer from "@/containers/DataCardContainer";

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
  const contentHeight =
    isItemClicked && sideBarItemData ? 90 * sideBarItemData.length : 0;

  return (
    <>
      <div
        style={{
          height: "50px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: isHover ? "lightblue" : "",
          width: "100%",
          cursor: "pointer",
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
          }}
        >
          {text}
        </span>
      </div>
      <div
        style={{
          overflow: "hidden",
          paddingLeft: "30px",
          height: isSideBarOpened ? contentHeight : 0,
          transition: "height 0.5s ease", // height 값에 따른 transition 효과 추가
        }}
      >
        {!isLoading ? (
          sideBarItemData &&
          sideBarItemData.map((item) => {
            return <DataCardContainer sideBarItemProps={item} key={item._id} />;
          })
        ) : (
          <div>로딩중...</div>
        )}
      </div>
      {isSideBarOpened && isItemClicked && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* TODO: Pagination */}

          <BiChevronRight
            size={30}
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      )}
    </>
  );
};

export default SideBarItem;
