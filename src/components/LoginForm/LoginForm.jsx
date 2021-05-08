import { React, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Notification, Button, Form } from 'react-bulma-components';
import { useAuth } from '../../hooks/auth';

export default () => {
  const [password, setPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);

  const auth = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    setInvalidPassword(false);

    if (!password) {
      return '';
    }

    const authResult = await auth.signin(password);
    if (!authResult.ok) {
      setInvalidPassword(true);
    }

    return <Redirect to="/" />;
  };

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {invalidPassword && (
        <Notification color="danger">Senha inválida</Notification>
      )}
      <form action="" className="box">
        <Form.Field>
          <Form.Label htmlFor="password" className="label">
            Senha
          </Form.Label>
          <Form.Control>
            <Form.Input
              id="password"
              type="password"
              placeholder="*******"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Button
            type="submit"
            color="success"
            onClick={handleClick}
            disabled={!password || password.length <= 3}
          >
            Entrar
          </Button>
        </Form.Field>
      </form>
    </>
  );
};
