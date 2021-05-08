import { Heading, Hero, Container, Columns } from "react-bulma-components";
import LoginForm from "../../components/LoginForm";

export default () => {
  return (
    <Hero className="is-primary is-fullheight">
      <Hero.Body>
        <Container>
          <Columns centered>
            <Columns.Column tablet={5} desktop={4} widescreen={3}>
              <Heading>Rifa Online</Heading>
              <Heading subtitle>Informe a senha para acessar</Heading>
              <LoginForm></LoginForm>
            </Columns.Column>
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};
