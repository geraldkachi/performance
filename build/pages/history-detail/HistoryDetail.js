import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { format } from "date-fns";
import { Table, Modal } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button, NewTask } from "../../components";
import { getMetrics } from "../../server/base/metrix";
const columns = [
    {
        title: (_jsx(_Fragment, { children: _jsx("div", { className: "semibold whitespace-nowrap", children: "Staff Name" }) })),
        // dataIndex: 'staffName',
        render: (val) => (_jsx("span", { className: "whitespace-nowrap", children: val?.staffName })),
        width: "10%",
        align: "center",
    },
    {
        title: (_jsx(_Fragment, { children: _jsx("div", { className: "semibold whitespace-nowrap", children: "Joins Early" }) })),
        // dataIndex: 'joinedEarly',
        render: (val) => (_jsx("span", { children: val?.joinedEarly === "true" ? "True" : "False" })),
        width: "10%",
        align: "center",
    },
    {
        title: (_jsx(_Fragment, { children: _jsx("div", { className: "semibold whitespace-nowrap", children: "Present in Meeting" }) })),
        // dataIndex: 'completedMeeting',
        render: (val) => (_jsx("span", { children: val?.completedMeeting === "true" ? "True" : "False" })),
        width: "20%",
        align: "center",
    },
    {
        title: "Participation",
        // dataIndex: 'participation',
        render: (val) => (_jsx("span", { children: val?.participation })),
        width: "20%",
        align: "center",
    },
    {
        title: "Attendance",
        // dataIndex: 'attendedMeeting',
        render: (val) => (_jsx("span", { children: val?.attendedMeeting === "true" ? "True" : "False" })),
        width: "20%",
        align: "center",
    },
    {
        title: "Task",
        // dataIndex: 'role',
        render: () => _jsx("span", { className: "whitespace-nowrap", children: "--/--/----" }),
        width: "20%",
        align: "center",
    },
    {
        title: "Percentage",
        dataIndex: "review",
        width: "20%",
        align: "center",
    },
];
const HistoryDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stateNewTask, setStateNewTask] = useState(false);
    const { data, isLoading, isFetching } = useQuery(["getMetrics", page, limit], () => getMetrics(page, limit, id), { keepPreviousData: true });
    console.log(data?.data, "metrics");
    const onPageChange = (page) => {
        setPage(page);
    };
    const onLimitChange = (limit) => {
        setLimit(limit);
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), "email", _jsxs("div", { className: "mt-5 flex items-center justify-between", children: [_jsx("p", { className: " text-3xl bg-[##141C1F]", children: "History" }), _jsx(Button, { className: "text-center rounded-lg mt-5", title: "Assign Task", onClick: () => setStateNewTask(true) })] }), _jsxs("div", { className: "mt-5 flex items-center justify-between text-xl", children: ["Data for 01/01/2021 - 01/01/2022 displayed", " "] }), _jsx("div", { className: "mt-10 mb-20 overflow-x-auto", children: _jsx(Table, { size: "small", rowKey: "id", columns: columns, dataSource: data?.data, loading: isLoading || isFetching, pagination: {
                        position: ["bottomRight"],
                        current: page,
                        total: data?.data?.count,
                        pageSize: limit,
                        showSizeChanger: true,
                        onShowSizeChange: onLimitChange,
                        onChange: onPageChange,
                    }, style: { marginTop: "20px" } }) }), _jsx(Modal, { open: stateNewTask, onCancel: () => setStateNewTask(false), footer: null, maskClosable: false, closable: true, afterClose: () => setStateNewTask(false), children: _jsx(NewTask, { ...{ setStateNewTask } }) })] }));
};
export default HistoryDetail;
