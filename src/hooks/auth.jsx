import React, { useContext, createContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import api from '../utils/api';

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const useProvideAuth = () => {
  const authorizedUser = localStorage.getItem('user');

  const [user, setUser] = useState(
    authorizedUser ? JSON.parse(authorizedUser) : null,
  );

  const signin = async (password) => {
    const result = await api.authenticate(password);
    if (result.ok) {
      const resultUser = {
        user: 'Anonymous',
        admin: result.admin,
        loginDate: new Date(),
      };
      setUser(resultUser);
      localStorage.setItem('user', JSON.stringify(resultUser));
    }

    return result;
  };

  const signoff = () => {
    localStorage.clear();
    setUser(null);
  };

  return {
    user,
    signin,
    signoff,
  };
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
