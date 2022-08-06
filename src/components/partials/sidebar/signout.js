/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Cookies, headers } from "~/components/headersToken";
import { useAuth } from "~/store/auth";

// Handle sign out
const handleSignout = () => {
  const navigate = useNavigate();
  axios({
    method: "get",
    url: "http://localhost:3000/logout",
    headers,
  }).then((result) => console.log(result));
  navigate("/login");
};

export default handleSignout;
