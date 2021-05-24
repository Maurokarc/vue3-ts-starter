import Axios, { AxiosError, AxiosInstance } from "axios";
import { ElNotification } from "element-plus";
import { useStore } from "@/store";
import { AuthGetters } from "@/store/enums";
import router from "../router";

function ErrorNotification(title: string, message?: string) {
  ElNotification({
    showClose: true,
    type: "error",
    title: title,
    message: message
  });
}

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_PROXY,
  withCredentials: false
});

axios.interceptors.request.use(
  (config) => {
    const store = useStore();
    config.headers["Authorization"] = "Bearer " + store.getters[AuthGetters.GET_TOKEN];
    config.headers["Accept"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error)) handeAxiosError(error);

    return Promise.reject(error);
  }
);

export function isAxiosError<T>(error: AxiosError | any): error is AxiosError<T> {
  return error && error.isAxiosError;
}

export function handeAxiosError(error: AxiosError) {
  if (!error.response) {
    ErrorNotification("Request Error", error.message);
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get("redirect");
  const code = error.response.status;

  switch (error.response.status) {
    case 0:
      // Cancel , do nothing here
      break;
    case 401:
      router.push({
        name: "login",
        query: { redirect: redirectPath || window.location.pathname }
      });
      break;
    case 409:
      ErrorNotification("Validation Error");
      break;
    case 500:
      ErrorNotification("Server Error");
      break;
    default:
      console.error(`[Axios Error]`, error.response);
      break;
  }
}

export default axios;
