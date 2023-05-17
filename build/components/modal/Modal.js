import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ClickOutside } from "./ClickOutside";
const Modal = (props) => {
    const { type, icon, show, title, children, subTitle, closeModal } = props;
    return (_jsx(_Fragment, { children: show && (_jsxs(_Fragment, { children: [_jsx("div", { className: `justify-center items-center flex overflow-x-hidden overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none mx-3 ${show ? 'block' : 'hidden'}`, children: _jsx(ClickOutside, { onclickoutside: () => closeModal(false), className: ` fixed z-50 rounded-xl mx-0 overflow-hidden`, style: {
                            top: show ? '50%' : '-50%',
                            opacity: show ? 1 : 0,
                            // width: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }, children: _jsx("div", { className: "relative my-6 mx-auto", children: _jsxs("div", { className: "border-0 rounded-3xl p-5 sm:p-10 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none", children: [type === "icon" && (_jsx("div", { className: "flex items-center justify-center m-auto mt-10 w-20 h-20 rounded-full", children: icon })), _jsxs("div", { className: "mx-auto", children: [_jsx("h5", { className: "text-4xl font-semibold mt-5 text- w-80", children: title && title }), _jsx("p", { className: "text-center container mt-2 text-grey-slate text-base w-80", children: subTitle })] }), children] }) }) }) }), _jsx("div", { className: "opacity-25 fixed inset-0 z-40 bg-black" })] })) }));
};
export default Modal;
