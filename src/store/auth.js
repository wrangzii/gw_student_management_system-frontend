import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let accessToken, cookieDataUser, user, username;
    accessToken = Cookies.get("token");
    cookieDataUser = Cookies.get("user");
    user = cookieDataUser ? JSON.parse(cookieDataUser) : null;
    if (user) username = user.username;

    if (accessToken) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        accessToken,
        cookieDataUser,
        user,
        username,
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
