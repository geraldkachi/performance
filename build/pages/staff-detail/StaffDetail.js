import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { format } from "date-fns";
import { useQueries } from "react-query";
import { useParams } from "react-router";
import { Table, Modal, Spin, Tag } from "antd";
import Arrow from "../../assets/svg/Arrow";
import { getStaff } from "../../server/base";
import DonutChart from "../../components/Pie";
import { getTasks } from "../../server/base/task";
import { Button, NewTask } from "../../components";
import { getStaffMetric } from "../../server/base/metrix";
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
const swapper = (val) => {
    const words = val?.split(/(?=[A-Z])/);
    return words?.join(" ");
};
const StaffDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stateNewTask, setStateNewTask] = useState(false);
    const [staff, metric, task] = useQueries([
        {
            queryKey: `staff-${id}`,
            queryFn: () => getStaff(id),
            enabled: !!id,
        },
        {
            queryKey: `staff-metric-${id}`,
            queryFn: () => getStaffMetric(id),
            enabled: !!id,
        },
        {
            queryKey: ["taskApi", page, limit, id],
            queryFn: () => getTasks(page, limit, id),
            enabled: !!id,
        },
    ]);
    const { data: staffData, isLoading: staffLoading } = staff;
    const { data: metricData, isLoading: metricLoading } = metric;
    const { data: taskData, isLoading: taskLoading, isFetching: taskFetching, } = task;
    console.log(taskData);
    const onPageChange = (page) => {
        setPage(page);
    };
    const onLimitChange = (_, limit) => {
        setLimit(limit);
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: staffLoading ? (_jsx(Spin, {})) : (format(new Date(staffData?.data?.createdAt), "dd MMMM yyyy, hh:mm a")) }) }), _jsxs("div", { className: "mt-5 flex items-center justify-between", children: [_jsx("p", { className: " text-3xl bg-[##141C1F]", children: "Staff" }), _jsx(Button, { className: "text-center rounded-lg mt-5", title: "Assign Task", onClick: () => setStateNewTask(true) })] }), _jsx("div", { className: "mt-5 flex items-center justify-between text-xl font-bold capitalize", children: staffLoading ? (_jsx(Spin, {})) : (`${staffData?.data?.firstName} ${staffData?.data?.lastName}`) }), _jsx("div", { className: `flex gap-x-4 w-full overflow-auto ${metricLoading ? "justify-center items-center" : ""}`, children: metricLoading ? (_jsx(Spin, {})) : (metricData?.data &&
                    Object.keys(metricData?.data).map((item, i) => (_jsxs("div", { className: "rounded-2xl p-3 shadow-md", children: [_jsx(DonutChart, { data: [
                                    { type: "success", value: metricData?.data[item] },
                                    {
                                        type: "failure",
                                        value: 100 - metricData?.data[item],
                                    },
                                ], color: ["#52C93F", "#C8C6CD"] }), metricLoading ? (_jsx(Spin, {})) : (_jsxs("div", { className: "flex items-center justify-evenly", children: [_jsx("p", { className: "capitalize text-[#1A1919] text-[16px]", children: swapper(item) }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsxs("p", { className: "capitalize text-[#1A1919] text-[16px]", children: [Math.round(metricData?.data[item]), "%"] }), _jsx("div", { className: `${metricData?.data[item] < 50 && "rotate-180"}`, children: _jsx(Arrow, { fill: metricData?.data[item] < 50 ? "#F46036" : "#52C93F" }) })] })] }))] }, i)))) }), _jsxs("div", { className: "mt-10 mb-20 overflow-x-auto", children: [_jsx("div", { className: "flex items-center text-2xl mt-3", children: "Recent Tasks" }), _jsx(Table, { size: "small", columns: columns, dataSource: taskData?.data?.tasks, loading: taskLoading || taskFetching, rowKey: (record) => record?.id, style: { marginTop: "20px" }, pagination: {
                            position: ["bottomRight"],
                            current: page,
                            total: taskData?.data?.count,
                            pageSize: limit,
                            showSizeChanger: true,
                            onShowSizeChange: onLimitChange,
                            onChange: onPageChange,
                        } })] }), _jsx(Modal, { open: stateNewTask, onCancel: () => setStateNewTask(false), footer: null, maskClosable: false, children: _jsx(NewTask, { ...{ setStateNewTask } }) })] }));
};
export default StaffDetail;
