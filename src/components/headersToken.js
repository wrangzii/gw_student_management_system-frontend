import { Cookies } from "react-cookie";

const cookies = new Cookies();
const headers = {
  Authorization: "Bearer " + cookies.get("token"),
  "Content-Type": "application/json",
};

export {headers, cookies};