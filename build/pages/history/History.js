import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Table, DatePicker, Modal } from "antd";
import { getStandUp } from "../../server/base/standup";
import { Button, NewStaff, NewTask } from "../../components";
const History = () => {
    const navigate = useNavigate();
    const [dates, _setDates] = useState([]);
    const [stateNewTask, setStateNewTask] = useState(false);
    const [stateNewStaff, setStateNewStaff] = useState(false);
    const [filter, setFilter] = useState({ fromDate: "", toDate: "" });
    const [page, _setPage] = useState(1);
    const [limit, _setLimit] = useState(10);
    const { data, isLoading, isFetching } = useQuery(["getStandUp", limit, page], () => getStandUp(limit));
    console.log(data?.data?.standup, "history");
    const columns = [
        {
            title: "Stand Up Date",
            // dataIndex: 'startTime',
            render: (val) => (_jsx("span", { onClick: () => navigate(`/history/${val?.id}`), className: "cursor-pointer capitalize whitespace-nowrap", children: `${val?.createdAt
                    ? format(new Date(val?.createdAt), "dd MMMM yyyy, hh:mm a")
                    : "--/--/----"}` })),
            width: "10%",
            align: "center",
        },
        {
            title: "Participants",
            dataIndex: "creator",
            width: "10%",
            align: "center",
        },
        {
            title: "Tasks",
            render: (val) => (_jsx("span", { onClick: () => navigate(`/history/${val?.id}`), className: "cursor-pointer capitalize whitespace-nowrap", children: `--/--/----` })),
            width: "20%",
            align: "center",
        },
    ];
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), _jsxs("div", { className: "mt-5 flex items-center justify-between", children: [_jsx("p", { className: " text-3xl bg-[##141C1F]", children: "History" }), _jsx(Button, { className: "text-center rounded-lg mt-5", title: "Assign Task", onClick: () => setStateNewTask(true) })] }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx(Button, { variant: "outline", className: "cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]", type: "submit", title: "Add New Staff", onClick: () => setStateNewStaff(true) }) }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "flex items-center", children: [_jsxs("span", { className: "hidden lg:flex mr-2 text-sm text-[#141C1F]", children: [" ", "Start Date"] }), " ", _jsx(DatePicker, { renderExtraFooter: () => "extra footer", showTime: { format: "HH:mm" }, name: "StartEndDate", format: "DD/MM/YYYY HH:mm", style: { padding: "16px" }, className: "createDateRangePicker" })] }), " ", _jsxs("span", { className: "flex items-center", children: [_jsx("span", { className: "hidden lg:flex mr-2 text-sm text-[#141C1F]", children: "End Date" }), " ", _jsx(DatePicker, { renderExtraFooter: () => "extra footer", showTime: { format: "HH:mm" }, name: "StartEndDate", format: "DD/MM/YYYY HH:mm", style: { padding: "16px" }, className: "createDateRangePicker" })] }), " ", _jsx("div", { className: "mx-3", children: _jsx(Button, { title: "Filter", className: "rounded-lg px-10", size: "sm", onClick: () => setFilter({ fromDate: dates[0], toDate: dates[1] }) }) })] }) }), _jsx("div", { className: "mt-10 mb-20 overflow-x-auto", children: _jsx(Table, { size: "small", loading: isLoading || isFetching, columns: columns, dataSource: data?.data?.standup, pagination: {
                        position: ["bottomRight"],
                        current: page,
                        total: data?.data?.count,
                    }, style: { marginTop: "20px" } }) }), _jsx(Modal, { open: stateNewTask, onCancel: () => setStateNewTask(false), footer: null, maskClosable: false, children: _jsx(NewTask, { ...{ setStateNewTask } }) }), _jsx(Modal, { open: stateNewStaff, onCancel: () => setStateNewStaff(false), footer: null, maskClosable: false, children: _jsx(NewStaff, { ...{ setStateNewStaff } }) })] }));
};
export default History;
