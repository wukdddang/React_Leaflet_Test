import { CategoryData } from "@/api/getDataByCategory";
import DataCard from "@/components/templates/DataCard";
import useDataCardStore from "@/store/DataCardStore";
import React from "react";

type DataCardContainerType = {
  sideBarItemProps: CategoryData;
};

const DataCardContainer = ({ sideBarItemProps }: DataCardContainerType) => {
  const pushDataCards = useDataCardStore((state) => state.pushDataCards);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    pushDataCards({
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
