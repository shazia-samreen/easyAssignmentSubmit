import axios from "axios";

const http = axios.create({
  baseURL: "https://easy-assignment-submit.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
