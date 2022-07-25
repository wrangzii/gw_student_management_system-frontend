import { Cookies } from "../../headersToken";

// Handle sign out
const handleSignout = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  window.location.href('/');
};

export default handleSignout;
