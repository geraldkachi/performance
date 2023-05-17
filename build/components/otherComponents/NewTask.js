import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, } from "react";
import * as yup from "yup";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Input from "../input/Input";
import Button from "../button/Button";
import { getStaffs } from "../../server/base";
import { createTask } from "../../server/base/task";
let schema = yup.object().shape({});
const rolesOption = [
    { label: "Not Started", value: "not-started" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Finished", value: "finished" },
];
const NewTask = ({ setStateNewTask }) => {
    const queryClient = useQueryClient();
    const [staff, setStaff] = useState(null);
    const [page, _setPage] = useState(1);
    const [state, setState] = useState("");
    const [limit, _setLimit] = useState(100);
    const formInput = useRef(null);
    const [dependants, setDependants] = useState([]);
    const { data, isLoading } = useQuery(["getStaffs", limit, page], () => getStaffs(limit, page));
    const mutation = useMutation(createTask);
    const onFinish = (e) => {
        e.preventDefault();
        const values = {
            //@ts-ignore
            name: e.target["name"].value,
            staffId: staff,
            //@ts-ignore
            endDate: e.target["enddate"].value,
            //@ts-ignore
            startDate: e.target["startdate"].value,
            assignedBy: localStorage.getItem("staffId"),
            //@ts-ignore
            description: e.target["description"].value,
            dependants,
            status: state,
        };
        schema.validate(values).then((_val) => {
            mutation.mutate(values, {
                onSuccess: (_data) => {
                    queryClient.invalidateQueries("taskApi");
                    setStateNewTask((prev) => !prev);
                    toast.success("Task Created Successfully");
                },
                onError: (e) => {
                    if (e instanceof Error) {
                        toast.error(e.message);
                    }
                },
            });
        });
    };
    return (_jsxs("div", { className: "my-5 sm:my-0", children: [_jsx("div", { className: "flex items-center justify-between mb-10", children: _jsx("span", { className: "font-bold text-xl sm:text-4xl", children: "New Task" }) }), _jsxs("form", { onSubmit: onFinish, children: [_jsx(Input, { ref: formInput, label: "Task Name", name: "name", type: "text", placeholder: "Task Name" }), _jsxs("div", { className: "mt-5", children: [_jsx("div", { className: "", children: _jsx("label", { className: "my-1 text-black flex items-center text-left text-sm font-semibold mt-1", children: "Staff" }) }), _jsx(Select, { placeholder: "Select Staff", style: { width: "100%" }, size: "large", loading: isLoading, value: staff, onSelect: (e) => {
                                    setStaff(e);
                                }, options: data &&
                                    data?.data?.staff?.map((val) => {
                                        const temp = {
                                            value: val?.id,
                                            label: `${val?.firstName} ${val?.lastName}`,
                                        };
                                        return temp;
                                    }) })] }), _jsxs("div", { className: "mt-5", children: [_jsx("div", { className: "", children: _jsx("label", { className: "my-1 text-black flex items-center text-left text-sm font-semibold mt-1", children: "Dependants" }) }), _jsx(Select, { placeholder: "Select Dependants", style: { width: "100%" }, mode: "multiple", size: "large", allowClear: true, loading: isLoading, value: dependants, onChange: (e) => {
                                    setDependants(e);
                                }, options: data &&
                                    data?.data?.staff?.map((val) => {
                                        const temp = {
                                            value: val?.id,
                                            label: `${val?.firstName} ${val?.lastName}`,
                                        };
                                        return temp;
                                    }) })] }), _jsx(Input, { ref: formInput, label: "Start Date", name: "startdate", type: "date", placeholder: "Position" }), _jsx(Input, { ref: formInput, label: "End Date", name: "enddate", type: "date", placeholder: "Position" }), _jsx(Input, { ref: formInput, label: "Description", name: "description", placeholder: "Description", type: "text" }), _jsxs("div", { className: "mt-5", children: [_jsx("div", { className: "", children: _jsx("label", { className: "my-1 text-black flex items-center text-left text-sm font-semibold mt-1", children: "Status" }) }), _jsx(Select, { placeholder: "Select Status", style: { width: "100%" }, size: "large", onSelect: (e) => setState(e), options: rolesOption, className: "mb-3" })] }), _jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { loading: mutation.isLoading, className: "text-center rounded-lg mt-5", type: "submit", title: "Create Task" }) })] })] }));
};
export default NewTask;
