import { Card, Content, Heading } from 'react-bulma-components';
import React from 'react';
import PropTypes from 'prop-types';

const BetListItem = ({
  ticketValue, customerName, customerPhone, customerEmail,
}) => (
  <Card className="bet-card">
    <Card.Content>
      <Content>
        <Heading subtitle size={7} className="has-text-grey">
          Número:
        </Heading>

        <Heading size={4}>{ticketValue}</Heading>
        <div>
          <div className="mb-2">
            <span className="label has-text-grey is-size-7 m-0">
              Nome:
            </span>
            <strong className="is-uppercase">{customerName}</strong>
          </div>
          <div className="mb-2">
            <span className="label has-text-grey is-size-7 m-0">
              Telefone:
            </span>
            <strong>
              {customerPhone || '(Não Informado)'}
            </strong>
          </div>
          <div>
            <span className="label has-text-grey is-size-7 m-0">
              E-mail:
            </span>
            <strong>
              {customerEmail || '(Não Informado)'}
            </strong>
          </div>
        </div>
      </Content>
    </Card.Content>
  </Card>
);

BetListItem.propTypes = {
  ticketValue: PropTypes.number.isRequired,
  customerName: PropTypes.string.isRequired,
  customerPhone: PropTypes.string.isRequired,
  customerEmail: PropTypes.string.isRequired,
};

export default BetListItem;
