import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import Input from "../../components/input/Input";
import { login, verifyOtp } from "../../server/base";
import { toast } from "react-toastify";
import * as yup from "yup";
let schema = yup.object().shape({
    email: yup.string(),
    password: yup.string().required("Enter a valid password").min(6).nullable(),
});
let otpSchema = yup.object().shape({
    otp: yup.string().required().max(6),
});
const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const otpRef = useRef(null);
    const formInput = useRef(null);
    const [isOtp, setIsOtp] = useState(false);
    const mutation = useMutation(login, {
        onSuccess: (res) => {
            console.log(res, "res");
            setId(res?.data?.id);
            setIsOtp(true);
        },
        onError: (e) => {
            toast.error(e?.message || "Error siging in!");
        },
    });
    const { mutate: verifyOtpMutation, isLoading: otpLoading } = useMutation(verifyOtp, {
        onSuccess: (res) => {
            toast.success("Login successful");
            localStorage.setItem("role", JSON.stringify(res?.data?.staff?.role));
            localStorage.setItem("token", res?.data?.token);
            localStorage.setItem("firstName", res?.data?.staff?.firstName);
            localStorage.setItem("lastName", res?.data?.staff?.lastName);
            localStorage.setItem("staffId", res?.data?.staff?.id);
            navigate("/home");
        },
        onError: (e) => {
            toast.error(e?.message || "Error verifying OTP");
        },
    });
    const onFinish = (e) => {
        e.preventDefault();
        const values = {
            //@ts-ignore
            email: e.target["email"].value,
            //@ts-ignore
            password: e.target["password"].value,
        };
        schema
            .validate(values)
            .then((_val) => {
            //@ts-ignore
            mutation.mutate(values, {
                onError: (e) => {
                    if (e instanceof Error) {
                        toast.error(e.message);
                    }
                },
            });
        })
            .catch((e) => {
            toast.error(e.message);
        });
    };
    const onOtp = (e) => {
        e.preventDefault();
        const value = {
            //@ts-ignore
            otp: e.target["otp"].value,
        };
        otpSchema
            .validate(value)
            .then((_val) => {
            //@ts-ignore
            verifyOtpMutation({ ...value, id }, id);
        })
            .catch((e) => {
            toast.error(e.message);
        });
    };
    return (_jsxs("div", { className: "h-screen my-auto", children: [_jsx("div", { className: " absolute scale- top-[98px] left[-40px]", children: _jsx("img", { src: "", alt: "" }) }), _jsxs("div", { className: "pt-36 bg-gradien flex items-center justify-center my-auto", children: [_jsx("div", { className: "text-center logoLogin flex flex-col justify-center items-center absolute top-[13%] md:top-[12%]", children: _jsx("img", { src: "", alt: "" }) }), _jsxs("div", { className: "login z-10 p-5 rounded-lg w-full max-w-[23rem]  md:bg-white bg-transparent", children: [_jsx("div", { className: "p-[10px]" }), _jsx("div", { className: "text-center my-4", children: _jsx("p", { className: `${!isOtp ? "text-lg" : "text-md"} text-neutral-500`, children: !isOtp ? (_jsxs(_Fragment, { children: ["Welcome to", " ", _jsx("span", { className: "font-bold text-[#2B8572]", children: "Performance App" })] })) : (_jsx(_Fragment, { children: "Please Input your 6 digit OTP" })) }) }), !isOtp ? (_jsxs("form", { onSubmit: onFinish, children: [_jsx(Input, { label: "Email", ref: formInput, type: "email", name: "email", placeholder: "Email" }), _jsx(Input, { label: "Password", ref: formInput, type: "password", name: "password", placeholder: "Password" }), _jsx("div", { className: "mb-3 userInput", children: _jsx(Link, { to: "/reset", className: "text-[#FF5A5A] font-bold text-sm", children: "Reset Passsword" }) }), _jsx("div", { className: "flex items-center mt-10", children: _jsx(Button, { className: "w-full text-center", disabled: mutation?.isLoading, loading: mutation?.isLoading, title: "Sign In", type: "submit" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs("form", { className: "flex flex-col gap-8 w-full", onSubmit: onOtp, children: [_jsx(Input, { label: "Enter OTP", type: "number", name: "otp", width: "100%", ref: otpRef }), _jsx(Button, { className: "w-full text-center", title: "Enter Otp", type: "submit", loading: otpLoading, disabled: otpLoading, children: "Submit" })] }), _jsx("p", { className: "cursor-pointer  text-center text-[#2B8572] mt-8", onClick: () => setIsOtp(false), children: "Back to Login" })] }))] })] })] }));
};
export default Login;
