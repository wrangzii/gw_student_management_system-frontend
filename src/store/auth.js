import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let accessToken, cookieDataUser, jSessionId, user;
    accessToken = Cookies.get("token");
    cookieDataUser = Cookies.get("user");
    user = cookieDataUser ? JSON.parse(cookieDataUser) : null;

    if (accessToken) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        accessToken,
        jSessionId,
        user,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
