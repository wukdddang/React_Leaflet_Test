import { useState } from "react";
import useGlobalStore, { SideBarOptionType } from "../store/GlobalStore";

type SideBarItemProps = {
  text: SideBarOptionType;
  icon: React.ReactElement;
  children: JSX.Element;
};

const SideBarItem = ({ text, icon, children }: SideBarItemProps) => {
  const isSideBarOpened = useGlobalStore((state) => state.isSideBarOpened);
  const setCurrentSideBarOption = useGlobalStore(
    (state) => state.setCurrentSideBarOption
  );

  const [isItemClicked, setIsItemClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

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
        onClick={() => {
          setCurrentSideBarOption(text);
          setIsItemClicked((prev) => !prev);
        }}
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
          transition: "opacity 0.3s ease, max-height 0.3s ease",
          opacity: isItemClicked ? 1 : 0,
          maxHeight: isItemClicked ? "100px" : "0",
          overflow: "hidden",
        }}
      >
        <p>{children}</p>
        <p>{children}</p>
        <p>{children}</p>
      </span>
    </>
  );
};

export default SideBarItem;
