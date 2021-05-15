import { Heading } from 'react-bulma-components';
import React from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber from 'animated-number-react';

const BetsCountHeading = ({ totalBetCount, filteredCount }) => {
  const formatValue = (n) => Math.trunc(n);
  return (
    <Heading
      size={7}
      subtitle
    >
      Filtrando
      {' '}
      <AnimatedNumber value={filteredCount} formatValue={formatValue} />
      {' '}
      de
      {' '}
      <AnimatedNumber value={totalBetCount} formatValue={formatValue} />
      {' '}
      resultados
    </Heading>
  );
};

BetsCountHeading.propTypes = {
  totalBetCount: PropTypes.number.isRequired,
  filteredCount: PropTypes.number.isRequired,
};

export default BetsCountHeading;
