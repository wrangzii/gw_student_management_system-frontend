import Cookies from "js-cookie";
let user, username;
const headers = {
  Authorization: "Bearer " + Cookies.get("token"),
  "Content-Type": "application/json",
};

if (user) {
  user = JSON.parse(Cookies.get("user"));
  username = user.username;
}

export { headers, Cookies, user, username };
