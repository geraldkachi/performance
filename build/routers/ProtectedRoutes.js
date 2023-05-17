import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
const token = localStorage.getItem('token');
const ProtectedRoutes = () => {
    // const token = useAuth((state) => state.token);
    const location = useLocation();
    return (token ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/", state: { from: location }, replace: true }));
};
export default ProtectedRoutes;
