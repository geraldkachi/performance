import Cookies from "js-cookie"
import UseAuth from '../hooks/useAuth';

type IData = {
    data: object | any;
    meta: object & IToken | any;
    message: string;
}


type IToken = {
    token: string;
    secretKey: string
}


export const success = (data: IData) => {

    if(data?.meta && data?.meta?.token) {
        // set token here;
        UseAuth.setState({ token: data?.meta?.token });
        Cookies.set('Authenticated', data?.meta?.token);
    }

    return data;
}
