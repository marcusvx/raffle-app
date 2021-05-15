import { Box, Container, Table } from 'react-bulma-components';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import betListPropTypes from './BetList.proptypes';

const BetTable = ({ bets, loading }) => {
  const renderTable = (children) => (
    <Container>
      <Box>
        <Table striped hoverable className="is-fullwidth">
          <thead>
            <tr>
              <th>
                Número
              </th>
              <th>
                Nome
              </th>
              <th>
                Telefone
              </th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </Table>
      </Box>
    </Container>
  );

  if (loading) {
    return renderTable(
      [...Array(10).keys()].map((n) => (
        <tr key={n}>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
          <td><Skeleton /></td>
        </tr>
      )),
    );
  }

  return renderTable(bets.map((bet) => (
    <tr key={bet.ticketValue}>
      <td><strong>{bet.ticketValue}</strong></td>
      <td className="is-uppercase">{bet.customerName}</td>
      <td>{bet.customerPhone}</td>
      <td>{bet.customerEmail}</td>
    </tr>
  )));
};

BetTable.propTypes = betListPropTypes;

export default BetTable;
