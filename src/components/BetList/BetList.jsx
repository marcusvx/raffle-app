import { React, useEffect, useState } from 'react';
import { Columns, Container } from 'react-bulma-components';
import api from 'utils/api';
import './BetList.css';
import BetListItem from './BetListItem';
import BetListSort from './BetListSort';

export default () => {
  const [bets, setBets] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [sortDesc, setSortDesc] = useState(false);

  const getAllBets = async () => {
    const result = await api.getAllBets();
    setBets(sortDesc ? result.reverse() : result);
  };

  useEffect(() => {
    const sortBets = () => {
      switch (sortType) {
        case 'number':
          setBets((state) => [...state].sort((a, b) => {
            if (sortDesc) return b.ticketValue - a.ticketValue;
            return a.ticketValue - b.ticketValue;
          }));
          break;

        case 'name':
          // eslint-disable-next-line max-len
          setBets((state) => [...state].sort((a, b) => {
            if (sortDesc) return b.customerName.localeCompare(a.customerName);
            return a.customerName.localeCompare(b.customerName);
          }));
          break;

        default:
          getAllBets();
          break;
      }
    };

    sortBets();
  }, [sortType, sortDesc]);

  const changeSort = (type) => {
    setSortDesc((state) => (type === sortType ? !state : false));
    setSortType(type);
  };

  return (
    <Container className="is-fluid">
      <Columns>
        <Columns.Column desktop={{ offset: 8, size: 4 }}>
          <BetListSort
            sortType={sortType}
            changeSort={(type) => changeSort(type)}
            sortDesc={sortDesc}
          />
        </Columns.Column>
      </Columns>
      <Columns centered>
        {bets
        && bets.map((bet) => (
          <Columns.Column
            key={bet.ticketValue}
            desktop={{ size: 4 }}
            tablet={{ size: 6 }}
            mobile={{ size: 12 }}
          >
            <BetListItem
              ticketValue={bet.ticketValue}
              customerPhone={bet.customerPhone}
              customerEmail={bet.customerEmail}
              customerName={bet.customerName}
            />
          </Columns.Column>
        ))}
      </Columns>
    </Container>
  );
};
