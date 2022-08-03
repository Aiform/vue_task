import axios from "axios";
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
const instance = axios.create({
  baseURL: "http://124.220.165.99:3008/api",
  timeout: 5000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
});

instance.interceptors.request.use(
  function (config) {
    nprogress.start()
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    nprogress.done()
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;

