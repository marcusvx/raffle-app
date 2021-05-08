import "./Spinner.css";

export default (props) => {
  const { show } = props;
  if (!show) {
    return "";
  }

  return (
    <div className="spinner">
      <div className="bounce1 has-background-grey"></div>
      <div className="bounce2 has-background-grey"></div>
      <div className="bounce3 has-background-grey"></div>
    </div>
  );
};
