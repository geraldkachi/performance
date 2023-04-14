import Cookies from 'js-cookie';
import axios, { AxiosError } from "axios";
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_API_KEY

const token = localStorage.getItem('token')

export const instance = () => {
    const instanceHttp = axios.create({
        // baseURL: BACKEND_URL,
        baseURL: `http://161.35.111.243:2009/v1/`,
        timeout: 50000,
        headers: {
            "Content-Type": "application/json",
            'X-SERVICE-ID': 'PERSONAL-APP',
        },
    });

    instanceHttp.interceptors.request.use((config) => {
        config.headers = config.headers ?? {};

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    });

    return instanceHttp
}

export const next = (e: AxiosError | any) => {
    // if (e?.response?.data?.message?.toLowerCase() === "jwt expired") {
    if (e?.response?.data?.message === "Session has expired") {
        toast.info("Your session has expired, logging you out!");
        setTimeout(() => {
            localStorage.clear();
            Cookies.remove('Authenticated')
            Cookies.remove('phone')
            Cookies.remove('email')
            Cookies.remove('customerId')
            Cookies.remove('identity')
            Cookies.remove('secret')
            window.location.replace("/");
            localStorage.clear();
        }, 3000);
    }
    throw new Error(
        e.response ?
            (e.response.data.message || e?.message)
            :
            toast.error("Something Went Wrong!")
    );
};
