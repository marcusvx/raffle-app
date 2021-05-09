import { React, useState, useEffect } from 'react';
import {
  Card, Heading, Content, Columns,
} from 'react-bulma-components';
import api from 'utils/api';

export default () => {
  const [bets, setBets] = useState();

  useEffect(() => {
    const getAllBets = async () => {
      const result = await api.getAllBets();

      setBets(result);
    };
    getAllBets();
  }, []);

  return (
    <>
      <Columns>
        {bets
          && bets.map((bet) => (
            <Columns.Column key={bet.ticketValue}>
              <Card style={{ margin: 'auto' }}>
                <Card.Content>
                  <Content>
                    <Heading subtitle size={6} className="has-text-grey">
                      Número
                    </Heading>

                    <Heading size={4}>{bet.ticketValue}</Heading>
                    <div>
                      <div className="mb-2">
                        <span className="label has-text-grey is-size-7 m-0">
                          Nome:
                        </span>
                        <strong>{bet.customerName}</strong>
                      </div>
                      <div className="mb-2">
                        <span className="label has-text-grey is-size-7 m-0">
                          Telefone:
                        </span>
                        <strong>{bet.customerPhone}</strong>
                      </div>
                      <div>
                        <span className="label has-text-grey is-size-7 m-0">
                          E-mail:
                        </span>
                        <strong>{bet.customerEmail}</strong>
                      </div>
                    </div>
                  </Content>
                </Card.Content>
              </Card>
            </Columns.Column>
          ))}
      </Columns>
    </>
  );
};
