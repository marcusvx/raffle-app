/* eslint-disable react/jsx-props-no-spreading */
import { React } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth, ProvideAuth } from './hooks/auth';
import DefaultPage from './pages/DefaultPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  const { requireAdmin } = rest;
  const canAccess = auth.user && (!requireAdmin || auth.user.admin);
  return (
    <Route
      {...rest}
      render={({ location }) => (canAccess ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ))}
    />
  );
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const Router = () => (
  <ProvideAuth>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute requireAdmin exact path="/admin">
          <AdminPage />
        </PrivateRoute>
        <PrivateRoute path="/">
          <DefaultPage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  </ProvideAuth>
);

export default Router;
