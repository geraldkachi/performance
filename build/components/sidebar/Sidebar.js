import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import AdministratorIcon from "../../assets/svg/AdministratorIcon";
// import DisburseIcon from "../../assets/svg/DisburseIcon";
// import HistoryIcon from "../../assets/svg/HistoryIcon";
// import ReportIcon from "../../assets/svg/ReportIcon";
// import MenuIcon from "../../assets/svg/MenuIcon";
// import { isAuthorised } from "../../utils";
import "./sidebar.css";
import LogoutIcon from "../../assets/svg/LogoutIcon";
import MenuIcon from "../../assets/svg/MenuIcon";
import StandUpIcon from "../../assets/svg/StandUpIcon";
import HistoryIcon from "../../assets/svg/HistoryIcon";
import TaskIcon from "../../assets/svg/TaskIcon";
import HomeIcon from "../../assets/svg/HomeIcon";
const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };
    const routeList = [
        { route: "/home", title: "Home" },
        { route: "/task", title: "Task" },
        { route: "/staff", title: "Staff" },
        { route: "/history", title: "History" },
        { route: "/stand-up", title: "Stand-up" },
        { route: "/statistics", title: "Statistics" },
        // ...(isAuthorised("super-admin")
        //   ? [{ route: "/administrator", title: "Administrator" }]
        //   : []),
    ];
    return (_jsx("section", { className: `sidebar hidden sm:block`, children: _jsxs("div", { className: ` sm:w-60 w-max flex flex-col justify-between transition-all ease-in-out  top-0 left-0 bg-[#] text-white p-5 h-screen pt-8 relative duration-300`, children: [_jsxs("div", { className: `pt-6 ${"" && " mx-auto"}`, children: [_jsxs("div", { className: "flex items-center justify-between pb-10 gap-4", children: [_jsx("div", { className: "text-xl whitespace-nowrap text-[#2B8572] font-bold", children: "Perfomance Metric" }), _jsx(MenuIcon, { onClick: () => setOpen(!open), className: `cursor-pointer duration-500 ${open && "rotate-[360deg]"}` })] }), routeList.map((item, index) => {
                            const activeItem = location.pathname.includes(item?.route);
                            const iconArr = [
                                _jsx(HomeIcon, { index: activeItem }, 1),
                                _jsx(TaskIcon, { index: activeItem }, 2),
                                _jsx(StandUpIcon, { index: activeItem }, 4),
                                _jsx(HistoryIcon, { index: activeItem }, 3),
                                _jsx(StandUpIcon, { index: activeItem }, 5),
                            ];
                            return (_jsxs(Link, { to: item.route, className: `${activeItem && "bg-[#2B8572] rounded-[4px]"} ${activeItem ? "text-white" : "text-[#716C81]"} hover:text-[#ebe5e5] flex items-center rounded-md p-2 cursor-pointer my-4 text-base space-x-3`, children: [_jsxs("div", { children: [" ", iconArr[index]] }, index), _jsx("span", { className: ` origin-left duration-200`, children: item.title })] }, index));
                        })] }), _jsx("div", { className: "flex items-center justify-start bg-[#E8E9F2] p-2 rounded-[4px] cursor-pointer", onClick: logout, children: _jsxs("div", { className: "flex items-center  gap-5", children: [_jsx(LogoutIcon, {}), _jsx("div", { className: `text-red-600 text-sm`, children: " Logout" })] }) })] }) }));
};
export default Sidebar;
