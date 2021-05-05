import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NumbersTable } from "./components/NumbersTable";
import { Login } from "./components/Login";
import { useAuth, ProvideAuth } from "./hooks/auth";

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log(auth.user);
        return auth.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    />
  );
}

export const Router = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <Login>Login</Login>
          </Route>
          <PrivateRoute path="/">
            <NumbersTable></NumbersTable>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
};
