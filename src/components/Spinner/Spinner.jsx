import { React } from 'react';
import './Spinner.css';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  const { show } = props;
  if (!show) {
    return '';
  }

  return (
    <div className="spinner">
      <div className="bounce1 has-background-grey" />
      <div className="bounce2 has-background-grey" />
      <div className="bounce3 has-background-grey" />
    </div>
  );
};

Spinner.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Spinner;
