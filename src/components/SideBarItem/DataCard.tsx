type DataCardType = {
  text: string;
};

const DataCard = ({ text }: DataCardType) => {
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id={text} />
      <label
        className="form-check-label"
        htmlFor={text}
        style={{
          width: "100%",
        }}
      >
        Default checkbox
      </label>
    </div>
  );
};

export default DataCard;
