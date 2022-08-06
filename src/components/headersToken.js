import Cookies from "js-cookie";
const headers = {
  Authorization: "Bearer " + Cookies.get("token"),
  "Content-Type": "application/json",
};

export { Cookies, headers };
