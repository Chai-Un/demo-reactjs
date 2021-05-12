import axios from "axios";
import { REQUEST_TIME_OUT, BASE_URL_API } from "../utils/constants";

// generate axios
const client = axios.create({
  timeout: REQUEST_TIME_OUT,
  baseURL: BASE_URL_API
});

// config request of axios
client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// config response of axios
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default client;
