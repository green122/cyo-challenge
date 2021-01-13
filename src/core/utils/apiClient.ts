import axios, { AxiosInstance } from "axios";
import { getAuthToken } from "../../services/auth.service";

// TODO: Probably we should write it in more generic way to have an opportunity
// to replace Axios with another library or native fetch
type APIClient = AxiosInstance;
let axiosClient: AxiosInstance;

export function apiClient(): APIClient {
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

  instance.interceptors.response.use(
    (resp) => resp,
    (error) => {
      throw error?.response?.data || error;
    }
  );

  axiosClient = instance;
  return instance;
}
