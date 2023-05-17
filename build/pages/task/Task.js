import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { Table, Modal } from "antd";
import { toast } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { Button, NewStaff, NewTask } from "../../components";
import { getTaskById, getTasks } from "../../server/base/task";
const Task = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stateNewTask, setStateNewTask] = useState(false);
    const [stateNewStaff, setStateNewStaff] = useState(false);
    const columns = [
        {
            title: "Task",
            // dataIndex: 'name',
            width: "10%",
            align: "center",
            render: (val) => (_jsxs("div", { className: " flex items-center", children: [_jsx("span", { className: "bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2" }), _jsx("span", { className: "capitalize whitespace-nowrap", children: `${val?.dataValues?.name}` })] })),
        },
        // {
        //   title: 'Staff Id',
        //   // dataIndex: 'staffId',
        //   width: '10%',
        //   align: 'center',
        //   render: (val: any) => (
        //     <span className="capitalize whitespace-nowrap">{`${val?.staffId}`}</span>
        //   )
        // },
        {
            title: "AssignedBy Id",
            // dataIndex: 'staffId',
            width: "10%",
            align: "center",
            render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap", children: `${val?.assignedBy}` })),
        },
        {
            title: "Task ID",
            // dataIndex: 'id',
            width: "5%",
            // align: 'start',
            render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap text-start cursor-pointer", onClick: () => 
                // navigate(`/task/${val?.id}`)
                null, children: `${val?.dataValues?.id}` })),
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
