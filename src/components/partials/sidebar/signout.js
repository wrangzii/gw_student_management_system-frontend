/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { Cookies } from "~/components/headersToken";
import { useAuth } from "~/store/auth";

// Handle sign out
const handleSignout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  auth.logout();
  Cookies.remove("token");
  Cookies.remove("user");
  // window.location.href("/");
  navigate("/");
};

export default handleSignout;
