import { React } from 'react';
import BetList from 'components/BetList';
import TopNavbar from 'components/TopNavbar';
import { Heading } from 'react-bulma-components';

export default () => (
  <>
    <TopNavbar />
    <Heading spaced size={4} className="is-uppercase m-4">
      Números registrados
    </Heading>
    <BetList />
  </>
);
