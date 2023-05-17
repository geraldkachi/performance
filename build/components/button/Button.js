import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const Spinner = () => _jsx("div", { className: " flex items-center justify-center px-10 py-[2px]", children: _jsx("div", { className: "w-5 h-5 border-4 border-dashed rounded-full animate-spin border-[#ffffff]" }) });
const variants = {
    primary: 'bg-blue text-white hover:bg-blue-2 border-none',
    secondary: 'bg-red text-white hover:bg-red-1 border-none',
    link: 'bg-none text-blue hover:bg-white-azure border-none',
    outline: 'bg-white text-blue hover:bg-white-azure border-blue disabled:border-grey-beau',
    "secondary-outline": 'bg-transparent text-red hover:bg-red hover:text-white border-red disabled:border-grey-beau'
};
const sizes = {
    sm: 'p-1 px-10 -w-128',
    md: 'p-2 px-10 -w-152',
    lg: 'p-3 px-10 -w-196'
};
const Button = ({ loading, disabled, title, className, size = 'lg', type = 'button', variant = 'primary', prefixIcon = null, suffixIcon = null, ...rest }) => {
    return (_jsxs("button", { ...rest, type: type, disabled: disabled || loading, className: `bg-[#2B8572] shadow-md py-3 md:py-4 px-8 md:px-12 rounded-lg font-bold disabled:bg-grey border disabled:text-gray-50 whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className} ${loading && 'py-3 md:py-4 px-8 md:px-12 '}`, children: [prefixIcon && (_jsxs(_Fragment, { children: [" ", prefixIcon, "\u00A0\u00A0\u00A0"] })), loading ? _jsx(Spinner, {}) : _jsx(_Fragment, { children: title }), suffixIcon && (_jsxs(_Fragment, { children: [" \u00A0\u00A0\u00A0", suffixIcon] }))] }));
};
export default Button;
