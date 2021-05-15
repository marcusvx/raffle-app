import React, { useEffect, useState } from 'react';
import {
  Box, Columns, Container, Icon, Level, Notification,
} from 'react-bulma-components';
import api from 'utils/api';
import './BetList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import BetListSort from './BetListSort';
import BetListViewOptions from './BetListViewOptions';
import BetTable from './BetTable';
import BetSearchForm from './BetSearchForm';
import BetCards from './BetCards';
import BetsCountHeading from './BetsCountHeading';

export default () => {
  const [bets, setBets] = useState([]);
  const [betCount, setBetCount] = useState(0);
  const [sortType, setSortType] = useState('default');
  const [sortDesc, setSortDesc] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAsTable, setShowAsTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const filterBets = (betList) => {
    if (searchTerm) {
      const numberSearch = Number.parseInt(searchTerm, 10);
      const filterFn = Number.isInteger(numberSearch)
        ? (bet) => bet.ticketValue === numberSearch
        : (bet) => bet.customerName.toLowerCase().indexOf(searchTerm) >= 0;
      return [...betList].filter(filterFn);
    }

    return betList;
  };

  useEffect(() => {
    const sortBets = async () => {
      const allBets = await api.getAllBets();
      const filteredBets = filterBets(allBets);
      setBetCount(allBets.length);

      switch (sortType) {
        case 'number':
          setBets(filteredBets.sort((a, b) => {
            if (sortDesc) return b.ticketValue - a.ticketValue;
            return a.ticketValue - b.ticketValue;
          }));
          break;

        case 'name':
          setBets(filteredBets.sort((a, b) => {
            if (sortDesc) return b.customerName.localeCompare(a.customerName);
            return a.customerName.localeCompare(b.customerName);
          }));
          break;

        default:
          setBets(sortDesc ? filteredBets.reverse() : filteredBets);
          break;
      }
    };

    setLoading(true);
    sortBets().then(() => setLoading(false));
  }, [sortType, sortDesc, searchTerm]);

  const changeSort = (type) => {
    setSortDesc((state) => (type === sortType ? !state : false));
    setSortType(type);
  };

  const renderContent = () => {
    if (bets.length) {
      return showAsTable ? <BetTable bets={bets} loading={loading} />
        : <BetCards bets={bets} loading={loading} />;
    }

    return (
      <Notification className="m-4 container has-text-centered is-warning is-light">
        <Icon className="mr-2">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </Icon>
        <span>Nenhum registro encontrado</span>
      </Notification>
    );
  };

  return (
    <>
      <Container className="is-fluid">
        <Box>
          <Level>
            <Level.Side>
              <Level.Item>
                <BetSearchForm onSearch={setSearchTerm} loading={loading} />
              </Level.Item>
              <Level.Item className="is-hidden-tablet-only">
                <BetsCountHeading totalBetCount={betCount} filteredCount={bets.length} />
              </Level.Item>
            </Level.Side>
            <Level.Side align="right">
              <Level.Item>
                <BetListViewOptions
                  changeView={(isTableView) => setShowAsTable(isTableView)}
                  showAsTable={showAsTable}
                />
              </Level.Item>
              <Level.Item>
                <BetListSort
                  sortType={sortType}
                  changeSort={(type) => changeSort(type)}
                  sortDesc={sortDesc}
                />
              </Level.Item>
            </Level.Side>
          </Level>
        </Box>
        <Columns centered>
          {renderContent()}
        </Columns>
      </Container>
    </>
  );
};
