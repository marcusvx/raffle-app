import { React } from 'react';
import {
  Heading, Hero, Container, Columns,
} from 'react-bulma-components';
import LoginForm from '../../components/LoginForm';

export default () => (
  <Hero className="is-primary is-fullheight">
    <Hero.Body>
      <Container>
        <Columns centered>
          <Columns.Column
            desktop={{ size: 5 }}
            tablet={{ size: 6 }}
            widescreen={{ size: 4 }}
          >
            <Heading>Rifa Online</Heading>
            <Heading subtitle>Informe a senha para acessar</Heading>
            <LoginForm />
          </Columns.Column>
        </Columns>
      </Container>
    </Hero.Body>
  </Hero>
);
