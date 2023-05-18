import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./layout.css";
import { Dropdown } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import BottomNav from "../bottomnav/BottomNav";
import ProfileIcon from "../../assets/svg/ProfileIcon";
import ChangePasswordModal from "../otherComponents/ChangePasswordModal";
const Layout = () => {
    const lastName = localStorage.getItem("lastName");
    const firstName = localStorage.getItem("firstName");
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    const close = () => setOpen(false);
    return (_jsxs("div", { children: [open ? _jsx(ChangePasswordModal, { ...{ open }, ...{ close } }) : null, _jsxs("section", { className: ` bg-[#FAFDFF]`, children: [_jsx(Sidebar, {}), _jsx("div", { className: `layout__content ${"open" ? "sm:pl-60" : "sm:pl-20"} `, children: _jsxs("div", { className: `layout__content-main p-5`, children: [_jsx("div", { className: "flex items-center justify-end mb-3", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Dropdown, { overlayClassName: "w-[200px]", trigger: ["click"], menu: {
                                                    items: [
                                                        // ...(isAuthorised("super-admin")
                                                        //     ? [
                                                        //         {
                                                        //             key: "1",
                                                        //             label: (
                                                        //                 <p
                                                        //                     onClick={() =>
                                                        //                         navigate("/administrator/create")
                                                        //                     }
                                                        //                 >
                                                        //                     Add admin
                                                        //                 </p>
                                                        //             ),
                                                        //         },
                                                        //     ]
                                                        //     : []),
                                                        {
                                                            key: "1",
                                                            label: _jsx("p", { onClick: show, children: "Change Password" }),
                                                        },
                                                    ],
                                                }, children: _jsx("div", { className: "bg-[#F5F3F9] rounded-lg w-[57px] h-[56px] cursor-pointer flex items-center justify-center", children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M10.0003 14C9.41693 14 8.83359 13.775 8.39193 13.3334L2.95859 7.90003C2.71693 7.65837 2.71693 7.25837 2.95859 7.0167C3.20026 6.77503 3.60026 6.77503 3.84193 7.0167L9.27526 12.45C9.67526 12.85 10.3253 12.85 10.7253 12.45L16.1586 7.0167C16.4003 6.77503 16.8003 6.77503 17.0419 7.0167C17.2836 7.25837 17.2836 7.65837 17.0419 7.90003L11.6086 13.3334C11.1669 13.775 10.5836 14 10.0003 14Z", fill: "#141C1F" }) }) }) }), _jsxs("div", { className: "bg-[#F5F3F9] pr-3 py-2 flex gap-4 items-center rounded-lg px-2 whitespace-nowrap ", children: [_jsx("span", { className: "text-sm font-semibold capitalize", children: `${lastName} ${firstName}` }), _jsx(ProfileIcon, {})] })] }) }), _jsx(Outlet, {})] }) }), _jsx(BottomNav, {})] })] }));
};
export default Layout;
