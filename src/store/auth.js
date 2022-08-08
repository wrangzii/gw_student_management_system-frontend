import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let accessToken, cookieDataUser, jSessionId, user, username, userId;
    accessToken = Cookies.get("token");
    cookieDataUser = Cookies.get("user");
    user = cookieDataUser ? JSON.parse(cookieDataUser) : null;
    if (user) {
      username = user.username;
      userId = user.userId;
    }

    if (accessToken) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        accessToken,
        cookieDataUser,
        jSessionId,
        user,
        username,
        userId,
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
