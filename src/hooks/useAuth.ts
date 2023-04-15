import { create } from "zustand";

// const token = JSON.parse(localStorage.getItem('Authenticated') as string);
const token = localStorage.getItem('token')

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
