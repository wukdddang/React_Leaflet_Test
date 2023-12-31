import useSideBarStore from "../store/SideBarStore";
import SideBar from "@/components/templates/SideBar";
import React from "react";

const SideBarContainer = () => {
  const isSideBarOpened = useSideBarStore((state) => state.isSideBarOpened);
  const toggleSideBarOpened = useSideBarStore(
    (state) => state.toggleSideBarOpened
  );

  const handleToggleSideBar = (e: React.MouseEvent) => {
    (e.target as HTMLElement).classList.toggle("open-sidebar");
  };

  return (
    <SideBar
      isSideBarOpened={isSideBarOpened}
      toggleSideBarOpened={toggleSideBarOpened}
      handleToggleSideBar={handleToggleSideBar}
    />
  );
};

export default SideBarContainer;
