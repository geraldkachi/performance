import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
const UnAuthLayout = () => {
    return (_jsx("div", { className: "", children: _jsx(Outlet, {}) }));
};
export default UnAuthLayout;
