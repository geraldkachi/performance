import Cookies from "js-cookie";
import UseAuth from '../hooks/useAuth';
export const success = (data) => {
    if (data?.meta && data?.meta?.token) {
        // set token here;
        UseAuth.setState({ token: data?.meta?.token });
        Cookies.set('Authenticated', data?.meta?.token);
    }
    return data;
};
