import { CategoryData } from "@/api/getDataByCategory";

type DataCardType = {
  isItemClicked: boolean;
  sideBarItem: CategoryData;
};

const DataCard = ({ isItemClicked, sideBarItem }: DataCardType) => {
  return (
    <div
      className="form-check"
      key={sideBarItem._id}
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
        id={sideBarItem._id}
        style={{
          width: "20px",
          height: "50px",
          border: "1px solid #000",
        }}
      />
      <label
        className="form-check-label"
        htmlFor={sideBarItem._id}
        style={{
          width: "100%",
          display: "flex",
          cursor: "pointer",
        }}
      >
        <img
          src={sideBarItem.previewUrl}
          style={{
            width: "100px",
            height: "60px",
            opacity: isItemClicked ? 1 : 0,
            transition: "opacity 1s ease",
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
              opacity: isItemClicked ? 1 : 0,
              fontSize: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {sideBarItem.title}
          </span>
          <span
            style={{
              opacity: isItemClicked ? 1 : 0,
              fontSize: "14px",
            }}
          >
            {sideBarItem.createdAt}
          </span>
        </div>
      </label>
    </div>
  );
};

export default DataCard;
