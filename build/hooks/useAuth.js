import { create } from "zustand";
// const token = JSON.parse(localStorage.getItem('Authenticated') as string);
const token = localStorage.getItem('token');
const useAuth = create((set, get) => ({
    token,
}));
export default useAuth;
