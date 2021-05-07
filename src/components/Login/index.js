import { Heading, Button, Form, Notification } from "react-bulma-components";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { Redirect } from "react-router-dom";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);

  const auth = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    setInvalidPassword(false);

    if (!password) {
      return;
    }

    const successAuth = await auth.signin(password);
    if (!successAuth) {
      setInvalidPassword(true);
    }

    return <Redirect to="/" />;
  };

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <Heading>Rifa Online</Heading>
              <Heading subtitle>Informe a senha para acessar</Heading>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
