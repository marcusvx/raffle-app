import { React } from 'react';
import { Navbar, Heading } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

const TopNavbar = () => {
  const auth = useAuth();
  const history = useHistory();
  const signoff = () => {
    auth.signoff();
    history.push('/login');
  };

  return (
    <Navbar fixed="top" color="primary">
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <Heading className="has-text-white">Rifa Online</Heading>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container align="right">
          {auth.user && auth.user.admin && (
            <Navbar.Item href="/admin">Ver Números</Navbar.Item>
          )}
          <Navbar.Item href="#" onClick={signoff}>
            Sair
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default TopNavbar;
