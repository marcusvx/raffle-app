import { Heading, Button, Form } from "react-bulma-components";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const handleClick = async () => {
    if (!password || password.length < 4) {
      return;
    }

    if (await auth.signin(password)) {
      return <Redirect to="/" />;
    }

    toast.error(`Senha inválida! Tente novamente.`, {
      position: toast.POSITION.TOP_CENTER,
    });
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
                  <Button color="success" onClick={handleClick}>
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
