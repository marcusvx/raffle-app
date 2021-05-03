import "./styles.css";

export const RaffleNumber = (props) => {
  const { taken, value, onClick } = props;

  if (taken) {
    return (
      <div
        title="Número indisponível"
        className="number m-1 is-size-4-desktop is-size-2-mobile has-text-grey-lighter is-stroked"
      >
        {value}
      </div>
    );
  }

  return (
    <div
      className="number m-1 is-size-4-desktop is-size-2-mobile clickable"
      onClick={() => onClick(value)}
    >
      {value}
    </div>
  );
};
