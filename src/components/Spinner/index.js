import "./styles.css";

export const Spinner = (props) => {
  const { show } = props;
  if (!show) {
    return "";
  }

  return (
    <div class="spinner">
      <div class="bounce1 has-background-grey"></div>
      <div class="bounce2 has-background-grey"></div>
      <div class="bounce3 has-background-grey"></div>
    </div>
  );
};
