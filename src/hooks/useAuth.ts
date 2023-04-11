import Cookies from "js-cookie";
import { create } from "zustand";

const token = JSON.parse(localStorage.getItem('Authenticated') as string);

type State = {
    token?: string | null
    email?: string | null
    phoneNumber?: string
    setPhoneNumber?: (phoneNumber: string) => void
    isAuthenticated?: boolean
}
const useAuth = create<State>((set, get) => ({
    token,
}));

export default useAuth;
