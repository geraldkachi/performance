import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

const BACKEND_URL = import.meta.env.VITE_API_KEY;

export const instance = () => {
  const instanceHttp = axios.create({
    baseURL: BACKEND_URL,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      "X-SERVICE-ID": "PERSONAL-APP",
    },
  });

  instanceHttp.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};

    //@ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  return instanceHttp;
};

export const next = (e: AxiosError | any) => {
  if (e?.response?.data?.message?.toLowerCase() === "jwt expired") {
    toast.info("Your session has expired, logging you out!");
    setTimeout(() => {
      localStorage.clear();
      window.location.replace("/");
    }, 3000);
  }
  throw new Error(
    e.response ? e.response.data.message : "Poor internet, please try again"
  );
};
