import { CategoryData } from "@/api/getDataByCategory";

type DataCardType = {
  isItemClicked: boolean;
  sideBarItemProps: CategoryData;
};

const DataCard = ({ isItemClicked, sideBarItemProps }: DataCardType) => {
  return (
    <div
      className="form-check"
      key={sideBarItemProps._id}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={sideBarItemProps._id}
        style={{
          width: "20px",
          height: "50px",
          border: "1px solid #000",
        }}
      />
      <label
        className="form-check-label"
        htmlFor={sideBarItemProps._id}
        style={{
          width: "100%",
          display: "flex",
          cursor: "pointer",
        }}
      >
        <img
          src={sideBarItemProps.previewUrl}
          style={{
            width: "100px",
            height: "60px",
          }}
        ></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "200px",
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
