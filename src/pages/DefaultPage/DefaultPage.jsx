import { React } from 'react';
import { Heading } from 'react-bulma-components';
import TopNavbar from '../../components/TopNavbar';
import RaffleNumberTable from '../../components/RaffleNumberTable';

export default () => (
  <>
    <TopNavbar />
    <Heading subtitle className="m-4">
      Clique em um número para concorrer ao sorteio
    </Heading>
    <RaffleNumberTable />
  </>
);
