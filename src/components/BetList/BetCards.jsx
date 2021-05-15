import { Columns } from 'react-bulma-components';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import BetListItem from './BetListItem';
import betListPropTypes from './BetList.proptypes';

const BetCards = ({ bets, loading }) => {
  const renderColumn = (key, children) => (
    <Columns.Column
      key={key}
      desktop={{ size: 4 }}
      tablet={{ size: 6 }}
      mobile={{ size: 12 }}
    >
      {children}
    </Columns.Column>
  );

  if (loading) {
    return (
      <>
        {Array(12).fill(1).map((value, index) => (
          renderColumn(value * index, <Skeleton height={250} />)
        ))}
      </>
    );
  }

  return (
    <>
      {bets.map((bet) => renderColumn(bet.ticketValue,
        <BetListItem
          ticketValue={bet.ticketValue}
          customerPhone={bet.customerPhone}
          customerEmail={bet.customerEmail}
          customerName={bet.customerName}
        />))}
    </>
  );
};
BetCards.propTypes = betListPropTypes;

export default BetCards;
