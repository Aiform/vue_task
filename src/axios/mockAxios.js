import axios from "axios";
const instance = axios.create({
  baseURL: "/mock",
  timeout: 5000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;

