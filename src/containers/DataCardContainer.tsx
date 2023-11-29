import { CategoryData } from "@/api/getDataByCategory";
import DataCard from "@/components/templates/DataCard";
import useGlobalStore from "@/store/GlobalStore";
import React from "react";

type DataCardContainerType = {
  sideBarItemProps: CategoryData;
};

const DataCardContainer = ({ sideBarItemProps }: DataCardContainerType) => {
  const toggleDataCards = useGlobalStore((state) => state.toggleDataCards);
  const setCurrentDataCard = useGlobalStore(
    (state) => state.setCurrentDataCard
  );

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleDataCards({
      title: sideBarItemProps.title,
      content: sideBarItemProps,
    });
    setCurrentDataCard({
      title: sideBarItemProps.title,
      content: sideBarItemProps,
    });
  };

  return (
    <DataCard
      handleCardClick={handleCardClick}
      sideBarItemProps={sideBarItemProps}
    />
  );
};

export default DataCardContainer;
