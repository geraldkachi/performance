import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from "antd";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { getStandUp } from "../../server/base/standup";
const columns = [
    {
        title: "Staff Name",
        // dataIndex: 'title',
        width: "10%",
        render: (val) => (_jsxs("div", { className: " flex items-center", children: [_jsx("span", { className: "bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2" }), _jsx("span", { className: "capitalize whitespace-nowrap", children: `${val?.title}` })] })),
    },
    {
        title: "Creator",
        // dataIndex: 'creator',
        width: "10%",
        // align: 'center',
        render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap", children: `${val?.creator}` })),
    },
    {
        title: "Date Created",
        // dataIndex: 'createdAt',
        width: "20%",
        // align: 'center',
        render: (val) => (_jsx("span", { className: "capitalize whitespace-nowrap", children: `${val?.createdAt
                ? format(new Date(val?.createdAt), "dd MMMM yyyy, hh:mm a")
                : "--/--/----"}` })),
    },
    // {
    //   title: 'Tasks',
    //   dataIndex: 'task',
    //   width: '5%',
    //   align: 'center',
    // },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   width: '12%',
    //   align: 'center',
    // },
];
const StandUp = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, isLoading, isFetching } = useQuery(["getStandUp", limit, page], () => getStandUp(limit));
    const onPageChange = (page) => {
        setPage(page);
    };
    const onLimitChange = (limit) => {
        setLimit(limit);
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("p", { className: " text-3xl bg-[##141C1F]", children: "Stand Up" }) }), _jsx("div", { className: "mt-5 flex items-center", children: _jsx(Button, { variant: "primary", className: "cursor-pointer px-14 py-4 my-5 rounded-lg bg-[#2B8572] text-[#ffffff]", type: "button", title: "Start Stand Up", onClick: () => navigate(`/stand-up/${"start-standup"}`) }) }), _jsx("div", { className: "mt-10 mb-20 overflow-x-auto", children: _jsx(Table, { size: "small", loading: isLoading || isFetching, columns: columns, dataSource: data?.data?.standup, pagination: {
                        position: ["bottomRight"],
                        current: page,
                        total: data?.data?.count,
                        pageSize: limit,
                        showSizeChanger: true,
                        onShowSizeChange: onLimitChange,
                        onChange: onPageChange,
                    }, rowKey: (record) => record?.id, style: { marginTop: "20px" }, onRow: (val) => ({
                        onClick: () => {
                            navigate(`/stand-up/${val?.id}`);
                        },
                    }) }) })] }));
};
export default StandUp;
