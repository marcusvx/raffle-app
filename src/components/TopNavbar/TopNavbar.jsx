import { React, useState } from 'react';
import { Icon, Navbar, Heading } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/auth';
import { ReactComponent as Logo } from './icon.svg';

const TopNavbar = () => {
  const [menuVisble, setMenuVisible] = useState(false);
  const auth = useAuth();
  const history = useHistory();
  const signoff = () => {
    auth.signoff();
    history.push('/login');
  };

  const handleClick = () => {
    setMenuVisible((state) => !state);
  };

  const getStateClass = () => (menuVisble ? 'is-active' : '');

  return (
    <Navbar fixed="top" color="primary">
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <Logo className="mr-2 image is-32x32" />
          <Heading className="has-text-white">Rifa Online</Heading>
        </Navbar.Item>
        <Navbar.Burger className={getStateClass()} onClick={handleClick} />
      </Navbar.Brand>
      <Navbar.Menu className={getStateClass()}>
        <Navbar.Container align="right">
          {auth.user && auth.user.admin && (
            <Navbar.Item href="/admin">
              <Icon className="mr-2">
                <FontAwesomeIcon icon={faReceipt} />
              </Icon>
              Ver Números
            </Navbar.Item>
          )}
          <Navbar.Item href="#" onClick={signoff}>
            <Icon className="mr-2">
              <FontAwesomeIcon icon={faDoorOpen} />
            </Icon>
            Sair
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default TopNavbar;
