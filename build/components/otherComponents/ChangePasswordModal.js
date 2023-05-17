import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as yup from "yup";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useState } from 'react';
import Input from "../input/Input";
import Button from "../button/Button";
import { changePassword } from "../../server/base";
const schema = yup.object({
    currentPassword: yup.string().required("Enter current password"),
    password: yup
        .string()
        .required("Enter password")
        .min(8, "Passwords must be at least 8 characters"),
    // confirmPassword: yup
    //     .string()
    //     .required("Enter new password again")
    //     .min(8, "Passwords must be at least 8 characters")
    //     .oneOf([yup.ref("newPassword")], "New passwords do not match."),
});
const ChangePasswordModal = ({ open, close }) => {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        password: "",
    });
    const mutation = useMutation(changePassword, {
        onSuccess: (res) => {
            toast.success(res?.message);
            close();
        },
        onError: (e) => {
            toast.error(e?.message || "Something went wrong");
        },
    });
    const handleChange = (e) => {
        setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const onChangePassword = (e) => {
        e.preventDefault();
        console.log(passwords, 'passwordspasswordspasswords');
        schema
            .validate(passwords)
            .then((_res) => {
            mutation.mutate({
                password: passwords?.password,
                currentPassword: passwords?.currentPassword,
            });
            console.log(passwords, "passwords --------");
        })
            .catch((e) => {
            toast.error(e?.message);
        });
    };
    return (_jsx(Modal, { open: open, onCancel: close, footer: null, maskClosable: false, children: _jsxs("div", { className: "flex flex-col items-center justify-center gap-12 w-[100%]", children: [_jsx("h3", { className: "flex items-start text-start text-neutral-500 text-xl font-bold", children: "Change Password" }), _jsxs("form", { className: "w-[100%] flex flex-col gap-5", onSubmit: onChangePassword, children: [_jsx(Input, { type: "password", label: "Current password", name: "currentPassword", width: "100%", placeholder: "Enter current password", onChange: handleChange }), _jsx(Input, { type: "password", label: "Password", name: "password", width: "100%", placeholder: "Enter new password", onChange: handleChange }), _jsx(Button, { className: 'w-full text-center mt-5', title: "Enter Otp", type: "submit", loading: mutation.isLoading, disabled: mutation.isLoading })] })] }) }));
};
export default ChangePasswordModal;
