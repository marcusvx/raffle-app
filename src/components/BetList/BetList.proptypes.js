import PropTypes from 'prop-types';

const betListPropTypes = {
  bets: PropTypes.arrayOf(PropTypes.shape({
    ticketValue: PropTypes.number.isRequired,
    customerName: PropTypes.string.isRequired,
    customerPhone: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    loading: PropTypes.bool,
  })).isRequired,
};

export default betListPropTypes;
