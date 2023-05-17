import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import UnAuthLayout from '../components/layout/UnAuthLayout';
const UnProtectedRoutes = () => {
    const token = localStorage.getItem("token");
    return !token ? _jsx(UnAuthLayout, {}) : _jsx(Navigate, { to: "/home" });
};
export default UnProtectedRoutes;
