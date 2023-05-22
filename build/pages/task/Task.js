import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { Table, Modal, Tag } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { Button, NewStaff, NewTask } from "../../components";
import { getTaskById, getTasks } from "../../server/base/task";
const Task = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stateNewTask, setStateNewTask] = useState(false);
    const [stateNewStaff, setStateNewStaff] = useState(false);
    const columns = [
        {
            title: "Task",
            dataIndex: "name",
            width: "10%",
            align: "center",
            render: (val) => (_jsx("div", { className: " flex items-center", children: _jsx("span", { className: "capitalize whitespace-nowrap", children: `${val}` }) })),
        },
        {
            title: "Dependants",
            dataIndex: "dependants",
            width: "10%",
            align: "center",
            render: (val) => (_jsx("span", { className: "capitalize", children: val.length > 1 ? `${val[0]} + ${val.length - 1}` : val[0] })),
        },
        {
            title: "AssignedBy Id",
            width: "10%",
            align: "center",
            render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap", children: `${val?.assignedBy}` })),
        },
        {
            title: "Start Date",
            width: "5%",
            render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap text-start cursor-pointer", children: `${format(new Date(val?.startDate), "MM/dd/yyyy - h:mma")}` })),
        },
        {
            title: "End Date",
            width: "5%",
            render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap text-start cursor-pointer", children: `${format(new Date(val.endDate), "MM/dd/yyyy - h:mma")}` })),
        },
        {
            title: "Status",
            width: "5%",
            dataIndex: "status",
            render: (val) => (_jsx(Tag, { color: val === "not-started" ? "red" : val === "ongoing" ? "blue" : "green", children: val })),
        },
    ];
    const { mutate: toDelete, isLoading: deleteLoading } = useMutation(getTaskById, {
        onSuccess: (res) => {
            toast.success(res?.message || "Admin deleted successfully");
            // queryClient.invalidateQueries("all-admins");
            // close();
        },
        onError: (e) => {
            toast.error(e?.message || "Error deleting admin");
        },
    });
    const { data, isLoading, isFetching } = useQuery(["taskApi", page, limit], () => getTasks(page, limit));
    const onPageChange = (page) => {
        setPage(page);
    };
    const onLimitChange = (_, limit) => {
        setLimit(limit);
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), _jsxs("div", { className: "mt-5 flex items-center justify-between", children: [_jsx("p", { className: " text-3xl bg-[##141C1F]", children: "Tasks" }), _jsx(Button, { className: "text-center rounded-lg mt-5", title: "Assign Task", onClick: () => setStateNewTask(true) })] }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx(Button, { variant: "outline", className: "cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]", type: "submit", title: "Add New Staff", onClick: () => setStateNewStaff(true) }) }), _jsx("div", { className: "mt-10 mb-20 overflow-x-auto", children: _jsx(Table, { size: "small", columns: columns, dataSource: data?.data?.tasks, rowKey: (record) => record?.id, loading: isLoading || isFetching, pagination: {
                        position: ["bottomRight"],
                        current: page,
                        total: data?.data?.count,
                        pageSize: limit,
                        showSizeChanger: true,
                        onShowSizeChange: onLimitChange,
                        onChange: onPageChange,
                    }, rowClassName: (_record, index) => (index % 2 !== 0 ? "stripe" : ""), style: { marginTop: "20px" } }) }), _jsx(Modal, { open: stateNewTask, onCancel: () => setStateNewTask(false), footer: null, maskClosable: false, children: _jsx(NewTask, { ...{ setStateNewTask } }) }), _jsx(Modal, { open: stateNewStaff, onCancel: () => setStateNewStaff(false), footer: null, maskClosable: false, children: _jsx(NewStaff, { ...{ setStateNewStaff } }) })] }));
};
export default Task;
