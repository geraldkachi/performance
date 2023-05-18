import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    return token ? (_jsx(Outlet, {})) : (_jsx(Navigate, { to: "/", state: { from: location }, replace: true }));
};
export default ProtectedRoutes;
