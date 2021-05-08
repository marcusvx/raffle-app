import { React } from 'react';
import './RaffleNumber.css';
import PropTypes from 'prop-types';

const RaffleNumber = (props) => {
  const { ticket, onClick } = props;
  const { value, taken } = ticket;

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
    <button
      type="button"
      className="number m-1 is-size-4-desktop is-size-2-mobile clickable"
      onClick={() => onClick(ticket)}
    >
      {value}
    </button>
  );
};

RaffleNumber.propTypes = {
  ticket: PropTypes.exact({
    id: PropTypes.string,
    value: PropTypes.number,
    taken: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RaffleNumber;
