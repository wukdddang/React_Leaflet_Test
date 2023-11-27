import { CategoryData } from "@/api/getDataByCategory";
import React from "react";

type Props = {
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  sideBarItemProps: CategoryData;
};

const DataCard = ({ handleCardClick, sideBarItemProps }: Props) => {
  return (
    <div
      className="form-check"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        margin: "20px 0",
        cursor: "pointer",
      }}
    >
      <input
        className="form-check-input"
        type="checkbox"
        value={sideBarItemProps.title}
        id={sideBarItemProps._id}
        onClick={handleCardClick}
        style={{
          width: "20px",
          height: "50px",
          border: "1px solid #aaa",
          cursor: "pointer",
        }}
      />
      <label
        className="form-check-label"
        htmlFor={sideBarItemProps._id}
        style={{
          width: "100%",
          display: "flex",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        <img
          src={sideBarItemProps.previewUrl}
          style={{
            display: "flex",
            width: "100px",
            height: "60px",
            flexShrink: 0,
            borderRadius: "10px",
            border: "1px solid #aaa",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "220px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {sideBarItemProps.title}
          </span>
          <span
            style={{
              fontSize: "14px",
            }}
          >
            {sideBarItemProps.createdAt}
          </span>
        </div>
      </label>
    </div>
  );
};

export default DataCard;
