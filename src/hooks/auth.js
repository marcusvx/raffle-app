import React, { useContext, createContext, useState } from "react";
import api from "../utils/api";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

const useProvideAuth = () => {
  const authorizedUser = localStorage.getItem("user");

  const [user, setUser] = useState(
    authorizedUser ? JSON.parse(authorizedUser) : null
  );

  const signin = async (password) => {
    const result = await api.authenticate(password);
    if (result.ok) {
      const user = {
        user: "Anonymous",
        admin: result.admin,
        loginDate: new Date(),
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
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
