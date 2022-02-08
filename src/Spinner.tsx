import "./Spinner.scss";

const Spinner: React.FC<{ persent?: number }> = ({ persent }) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner__node">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="spinner__info-text" style={{ color: "white" }}>
          {persent && `loading: ${persent}%`}
        </span>
      </div>
    </div>
  );
};

export default Spinner;
