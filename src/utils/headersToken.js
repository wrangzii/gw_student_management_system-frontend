import Cookies from "js-cookie";

const token = Cookies.get("token");

const headers = {
  Authorization: "Bearer " + token,
  "Content-Type": "application/json",
};

export { headers };
