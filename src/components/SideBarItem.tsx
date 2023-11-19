import { useState } from "react";
import useGlobalStore from "../store/GlobalStore";

type SideBarItem = {
  text: string;
  children: JSX.Element;
};

const SideBarItem = ({ text, children }: SideBarItem) => {
  const isSideBarOpened = useGlobalStore((state) => state.isSideBarOpened);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
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
        {children}
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
  );
};

export default SideBarItem;
