import useSideBarStore from "../store/SideBarStore";
import SideBar from "@/components/SideBar";

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
