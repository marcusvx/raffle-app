import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuth, ProvideAuth } from "./hooks/auth";
import DefaultPage from "./pages/DefaultPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

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
            <LoginPage></LoginPage>
          </Route>
          <PrivateRoute requireAdmin={true} exact path="/admin">
            <AdminPage></AdminPage>
          </PrivateRoute>
          <PrivateRoute path="/">
            <DefaultPage></DefaultPage>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
};
