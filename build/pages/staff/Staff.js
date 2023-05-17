import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { Table, Modal, Tag } from "antd";
import { getStaffs } from "../../server/base";
import { Button, NewStaff, NewTask } from "../../components";
const Staff = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stateNewTask, setStateNewTask] = useState(false);
    const [stateNewStaff, setStateNewStaff] = useState(false);
    const { data, isLoading, isFetching } = useQuery(["getStaffs", limit, page], () => getStaffs(limit, page), { keepPreviousData: true });
    const onPageChange = (page) => {
        setPage(page);
    };
    const onLimitChange = (_, limit) => {
        setLimit(limit);
    };
    const columns = [
        {
            title: "Staff Name",
            width: "10%",
            render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap text-start", children: `${val?.firstName} ${val?.lastName}` })),
        },
        {
            title: "Email Address",
            dataIndex: "email",
            width: "10%",
        },
        {
            title: "Role",
            dataIndex: "role",
            width: "20%",
            align: "center",
            render: (val) => (_jsx("span", { className: "capitalize", children: val === "admin" ? "admin" : "super admin" })),
        },
        {
            title: "Status",
            width: "12%",
            dataIndex: "isActive",
            align: "center",
            render: (val) => (_jsx(Tag, { color: val ? "green" : "red", children: val ? "Active" : "Inactive" })),
        },
    ];
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), _jsxs("div", { className: "mt-5 flex items-center justify-between", children: [_jsx("p", { className: " text-3xl bg-[##141C1F]", children: "Staff" }), _jsx(Button, { className: "text-center rounded-lg mt-5", title: "Assign Task", onClick: () => setStateNewTask(true) })] }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx(Button, { variant: "outline", className: "cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]", type: "submit", title: "Add New Staff", onClick: () => setStateNewStaff(true) }) }), _jsx("div", { className: "mt-10 mb-20 overflow-x-auto", children: _jsx(Table, { size: "small", rowKey: (record) => record?.id, loading: isLoading || isFetching, columns: columns, dataSource: data?.data?.staff, pagination: {
                        position: ["bottomRight"],
                        current: page,
                        total: data?.data?.count,
                        pageSize: limit,
                        showSizeChanger: true,
                        onShowSizeChange: onLimitChange,
                        onChange: onPageChange,
                    }, style: { marginTop: "20px" } }) }), _jsx(Modal, { open: stateNewTask, onCancel: () => setStateNewTask(false), footer: null, maskClosable: false, children: _jsx(NewTask, { ...{ setStateNewTask } }) }), _jsx(Modal, { open: stateNewStaff, onCancel: () => setStateNewStaff(false), footer: null, maskClosable: false, children: _jsx(NewStaff, { ...{ setStateNewStaff } }) })] }));
};
export default Staff;
