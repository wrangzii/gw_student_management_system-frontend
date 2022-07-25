import Cookies from "js-cookie";
import user from "./authentication/getUserInfo";
const headers = {
  Authorization: "Bearer " + user.token,
  "Content-Type": "application/json",
};

export { headers, Cookies };
