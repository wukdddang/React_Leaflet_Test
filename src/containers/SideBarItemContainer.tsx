import { useEffect, useState } from "react";
import useSideBarStore, { SideBarOptionType } from "../store/SideBarStore";
import getDataByCategoryAndPage from "@/api/getDataByCategory";
import SideBarItem from "@/components/templates/SideBarItem";
import { useQuery } from "@tanstack/react-query";

export type SideBarItemProps = {
  text: Exclude<SideBarOptionType, null>;
  icon: React.ReactElement;
};

const SideBarItemContainer = ({ text, icon }: SideBarItemProps) => {
  const isSideBarOpened = useSideBarStore((state) => state.isSideBarOpened);
  const setCurrentSideBarOption = useSideBarStore(
    (state) => state.setCurrentSideBarOption
  );
  const pushCurrentSideBarOption = useSideBarStore(
    (state) => state.pushCurrentSideBarOption
  );
  const clickedSideBarOptions = useSideBarStore(
    (state) => state.clickedSideBarOptions
  );
  const [isItemClicked, setIsItemClicked] = useState(false);
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  const sideBarCategory = text.toLocaleLowerCase().split(" ")[0];

  const handleMouseEnter = () => {
    setIsMouseHovering(true);
  };
  const handleMouseLeave = () => {
    setIsMouseHovering(false);
  };

  const handleClick = () => {
    getDataByCategoryAndPage(sideBarCategory);
    setCurrentSideBarOption(text);
    pushCurrentSideBarOption(text, clickedSideBarOptions);
    setIsItemClicked((prev) => !prev);
  };

  const { data: sideBarItemData, isLoading } = useQuery({
    queryKey: [sideBarCategory],
    queryFn: () => getDataByCategoryAndPage(sideBarCategory),
  });

  useEffect(() => {
    const isOptionInClickedArr = clickedSideBarOptions.filter(
      (option) => option === text
    ).length;
    if (!isOptionInClickedArr) {
      setIsItemClicked(false);
    }
  }, [clickedSideBarOptions, text]);

  return (
    <SideBarItem
      text={text}
      icon={icon}
      isHover={isMouseHovering}
      isSideBarOpened={isSideBarOpened}
      isItemClicked={isItemClicked}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      handleClick={handleClick}
      sideBarItemData={sideBarItemData}
      isLoading={isLoading}
    />
  );
};

export default SideBarItemContainer;
