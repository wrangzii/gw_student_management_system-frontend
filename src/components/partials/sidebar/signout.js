import { cookies } from "../../headersToken";

// Handle sign out
const handleSignout = () => {
  cookies.remove("token");
  cookies.remove("fullName");
  cookies.remove("email");
  cookies.remove("username");
  cookies.remove("userId");
  cookies.remove("roles");
  cookies.remove("dob");
  cookies.remove("address");
  cookies.remove("phoneNumber");
  window.location.href('/');
};

export default handleSignout;
