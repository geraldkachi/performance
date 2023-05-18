import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as yup from "yup";
import { Select } from "antd";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button } from "../../components";
import { getStaffs } from "../../server/base";
import Input from "../../components/input/Input";
import { createStandUp } from "../../server/base/standup";
let schema = yup.object().shape({});
const StandUpDetail = () => {
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [role, setRole] = useState("");
    const formInput = useRef(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const mutation = useMutation(createStandUp);
    const { data, isLoading, isFetching } = useQuery(["getStaffs", limit, page], () => getStaffs(limit, page), { keepPreviousData: true });
    const onFinish = (e) => {
        e.preventDefault();
        let values = {
            //@ts-ignore
            title: e.target["title"].value,
            participants: state,
        };
        // console.log(values, 'values')
        schema.validate(values).then(() => {
            mutation.mutate(values, {
                onSuccess: (data) => {
                    localStorage.setItem("standupId", data?.data?.id);
                    toast.success(data?.message);
                    values = { title: "", participants: [] };
                    navigate(`/stand-up/${data?.data?.id}`);
                },
                onError: (e) => {
                    if (e instanceof Error) {
                        toast.error(e.message);
                    }
                },
            });
        });
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("p", { className: " text-3xl bg-[##141C1F] mt-20 sm:text-4xl", children: "Start Meeting" }) }), _jsx("div", { className: "grid sm:grid-cols-2 mb-20", children: _jsxs("form", { onSubmit: onFinish, children: [_jsx(Input, { ref: formInput, label: "Title", name: "title", type: "text", placeholder: "Enter meeting title" }), _jsxs("div", { className: "mt-5", children: [_jsx("div", { className: "", children: _jsx("label", { className: "my-1 text-black flex items-center text-left text-sm font-semibold mt-1", children: "Participation" }) }), _jsx(Select, { placeholder: "Select Participation", style: { width: "100%" }, mode: "multiple", size: "large", allowClear: true, loading: isLoading || isFetching, value: state, onChange: (e) => {
                                        setState(e);
                                    }, options: data &&
                                        data?.data?.staff?.map((val) => {
                                            const temp = {
                                                value: val?.id,
                                                label: `${val?.firstName} ${val?.lastName}`,
                                            };
                                            return temp;
                                        }), className: "mb-3 py-3" })] }), _jsx("div", { className: "flex items-center", children: _jsx(Button, { loading: mutation.isLoading, className: "text-center rounded-lg mt-10", type: "submit", title: "Start meeting" }) })] }) })] }));
};
export default StandUpDetail;
