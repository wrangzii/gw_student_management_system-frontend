import { Cookies } from "../../headersToken";

// Handle sign out
const handleSignout = () => {
  Cookies.remove("token");
  localStorage.removeItem("user")
  window.location.href('/');
};

export default handleSignout;
