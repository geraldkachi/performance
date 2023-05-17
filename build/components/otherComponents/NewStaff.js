import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useRef, useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { createStaff } from "../../server/base";
import { Select } from "antd";
export const rolesOption = [
    { label: "Admin", value: "admin" },
    { label: "Sub Admin", value: "sub-admin" },
    { label: "Super Admin", value: "super-admin" },
];
let schema = yup.object().shape({
    email: yup.string(),
    password: yup.string().required("Enter a valid password").min(6).nullable(),
});
const NewStaff = ({ setStateNewStaff }) => {
    const formInput = useRef(null);
    const [state, setState] = useState("");
    const mutation = useMutation(createStaff);
    const onFinish = (e) => {
        e.preventDefault();
        const values = {
            //@ts-ignore
            password: e.target["password"].value,
            //@ts-ignore
            firstName: e.target["firstName"].value,
            //@ts-ignore
            lastName: e.target["lastName"].value,
            //@ts-ignore
            email: e.target["email"].value,
            role: state,
            //@ts-ignore
            phoneNumber: e.target["phoneNumber"].value.replace(/ /g, ""),
        };
        console.log(values, "values");
        schema.validate(values).then((_val) => {
            mutation.mutate(values, {
                onSuccess: (_data) => {
                    setStateNewStaff((prev) => !prev);
                    toast.success("Staff Created Successfully");
                },
                onError: (e) => {
                    if (e instanceof Error) {
                        toast.error(e.message);
                    }
                },
            });
        });
    };
    return (_jsxs("div", { className: "my-5 sm:my-0", children: [_jsx("div", { className: "flex items-center justify-between mb-10", children: _jsx("span", { className: "font-bold text-xl sm:text-4xl", children: "New Staff" }) }), _jsxs("form", { onSubmit: onFinish, children: [_jsx(Input, { label: "Name", name: "firstName", ref: formInput, type: "text", placeholder: "First Name" }), _jsx(Input, { label: "Name", name: "lastName", ref: formInput, type: "text", placeholder: "Last Name" }), _jsx(Input, { label: "Email Address", ref: formInput, name: "email", placeholder: "Email Address", type: "email" }), _jsxs("div", { className: "mt-5", children: [_jsx("div", { className: "", children: _jsx("label", { className: "my-1 text-black flex items-center text-left text-sm font-semibold mt-1", children: "Status" }) }), _jsx(Select, { placeholder: "Select Status", style: { width: "100%" }, size: "large", onSelect: (e) => setState(e), options: rolesOption, className: "mb-3" })] }), _jsx(Input, { label: "Phone", ref: formInput, name: "phoneNumber", type: "tel", placeholder: "Phone Number" }), _jsx(Input, { label: "Password", ref: formInput, name: "password", type: "password", placeholder: "Password" }), _jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { className: "text-center rounded-lg mt-5 w-full", loading: mutation.isLoading, type: "submit", title: "Add New Staff" }) })] })] }));
};
export default NewStaff;
