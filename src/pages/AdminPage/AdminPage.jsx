import { React } from 'react';
import BetList from 'components/BetList';
import TopNavbar from 'components/TopNavbar';
import { Container, Heading } from 'react-bulma-components';

export default () => (
  <>
    <TopNavbar />
    <Heading subtitle className="m-4">
      Números registrados
    </Heading>
    <Container>
      <BetList />
    </Container>
  </>
);
