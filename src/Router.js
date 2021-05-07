import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { NumbersTable } from "./components/NumbersTable";
import { Login } from "./components/Login";
import { Admin } from "./components/Admin";
import { useAuth, ProvideAuth } from "./hooks/auth";

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  const { requireAdmin } = rest;
  const canAccess = auth.user && (!requireAdmin || auth.user.admin);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return canAccess ? (
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
            <Login></Login>
          </Route>
          <PrivateRoute requireAdmin={true} exact path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/">
            <NumbersTable></NumbersTable>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
};
