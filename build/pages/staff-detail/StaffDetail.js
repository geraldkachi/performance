import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { useState } from "react";
import { Table, Modal } from "antd";
import { Pie } from "@ant-design/plots";
import { Button, NewTask } from "../../components";
const pieChartData = [
    // {
    //   type: "new",
    //   value: 40
    // },
    // {
    //   type: "evaluating",
    //   value: 25
    // },
    {
        type: "ongoing",
        value: 22,
    },
    {
        type: "Task Rate",
        value: 22,
    },
    // {
    //   type: "archived",
    //   value: 10
    // }
];
const config = {
    width: 100,
    height: 300,
    appendPadding: 0,
    data: pieChartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    color: ["#ffffff", "#52C93F"],
    border: 1,
    label: {
        type: "inner",
        offset: "-50%",
        content: "{value}",
        style: {
            textAlign: "center",
            fontSize: 10,
        },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
        title: false,
        content: {
            style: {
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            formatter: function formatter() {
                return `total\n134`;
            },
        },
    },
};
const columns = [
    {
        title: "Staff Name",
        dataIndex: "name",
        width: "10%",
        align: "center",
    },
    {
        title: "Email Address",
        dataIndex: "email",
        width: "10%",
        align: "center",
    },
    {
        title: "Role",
        dataIndex: "role",
        width: "20%",
        align: "center",
    },
    {
        title: "Tasks",
        dataIndex: "task",
        width: "5%",
        align: "center",
    },
    {
        title: "Status",
        dataIndex: "status",
        width: "12%",
        align: "center",
    },
];
const StaffDetail = () => {
    // const {id} = useParams()
    const [stateNewTask, setStateNewTask] = useState(false);
    // const { data, isLoading, isFetching } = useQuery(["getTaskById", id], () => getTaskById(id), { keepPreviousData: true })
    // console.log(data, 'getTaskById')
    // console.log(id, 'id params')
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), _jsxs("div", { className: "mt-5 flex items-center justify-between", children: [_jsx("p", { className: " text-3xl bg-[##141C1F]", children: "Staff" }), _jsx(Button, { className: "text-center rounded-lg mt-5", title: "Assign Task", onClick: () => setStateNewTask(true) })] }), _jsxs("div", { className: "mt-5 flex items-center justify-between text-xl", children: ["Adimora Lord Gerald", " "] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-x-4", children: [_jsx("div", { className: "rounded-2xl p-3 shadow-md", children: _jsx(Pie, { ...config }) }), _jsx("div", { className: "rounded-2xl p-3 shadow-md", children: _jsx(Pie, { ...config }) }), _jsx("div", { className: "rounded-2xl p-3 shadow-md", children: _jsx(Pie, { ...config }) })] }), _jsxs("div", { className: "mt-10 mb-20 overflow-x-auto", children: [_jsx("div", { className: "flex items-center text-2xl mt-3", children: "Recent Tasks" }), _jsx(Table, { size: "small", columns: columns, dataSource: [], 
                        // loading={isLoading || isFetching }
                        rowKey: (record) => record?.id, style: { marginTop: "20px" } })] }), _jsx(Modal, { open: stateNewTask, onCancel: () => setStateNewTask(false), footer: null, maskClosable: false, children: _jsx(NewTask, { ...{ setStateNewTask } }) })] }));
};
export default StaffDetail;
