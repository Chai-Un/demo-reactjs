import axios from "axios";
import { REQUEST_TIME_OUT, BASE_URL_API } from "utils/constants";

const client = axios.create({
  timeout: REQUEST_TIME_OUT,
  baseURL: BASE_URL_API
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default client;
