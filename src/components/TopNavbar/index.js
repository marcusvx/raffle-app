import { Navbar, Heading } from "react-bulma-components";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router-dom";

export const TopNavbar = () => {
  const auth = useAuth();
  const history = useHistory();
  const signoff = () => {
    auth.signoff();
    history.push("/login");
  };

  return (
    <Navbar fixed="top" color="primary">
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <Heading className="has-text-white">Rifa Online</Heading>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container align="right">
          <Navbar.Item href="#" onClick={signoff}>
            Sair
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};
