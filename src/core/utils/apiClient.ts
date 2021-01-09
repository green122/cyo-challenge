import axios, { AxiosInstance } from "axios";
import { getAuthToken } from "../../services/auth.service";

let axiosClient: AxiosInstance;

export function apiClient() {
  if (axiosClient) {
    return axiosClient;
  }
  const instance = axios.create();

  instance.interceptors.request.use(
    (conf) => {
      const token = getAuthToken();
      if (token) {
        conf.headers["Authorization"] = token;
      }

      return conf;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosClient = instance;
  return instance;
}
