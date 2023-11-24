import axios from "axios";

const REQUEST_TIME = 7000;

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: REQUEST_TIME,
});

// const getAuthHeader = () => `bearer ${getItemFromStorage('token')}`;

// axiosClient.interceptors.request.use(
//   (config) => {
//     config.headers['Authorization'] = getAuthHeader();
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );
