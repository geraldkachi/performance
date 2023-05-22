import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Modal, Spin, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Card } from "../../components";
import Metric from "../../components/otherComponents/Metric";
import { getStandUpOne, endStandUpUpdate } from "../../server/base/standup";
import { formatRole } from "../../utils/helper";
const StandUpDetailEnd = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stateMetric, setStateMetric] = useState(false);
    const [participantId, setParticipantId] = useState("");
    const { data, isLoading, isFetching } = useQuery(["getStandUp", limit, page], () => getStandUpOne(id), {
        refetchOnMount: true,
        keepPreviousData: true,
    });
    const columns = [
        {
            title: "Staff Name",
            render: (val) => (_jsx("span", { className: "cursor-pointer", children: val?.staff?.name })),
        },
        {
            title: "Staff Role",
            render: (val) => (_jsx("span", { className: "cursor-pointer capitalize", children: formatRole(val?.staff?.role) })),
        },
    ];
    const { mutate, isLoading: mutateLoading } = useMutation(endStandUpUpdate, {
        onSuccess: (res) => {
            toast.success(res?.message);
            navigate("/stand-up");
            queryClient.invalidateQueries("getMetrics");
        },
        onError: (e) => {
            toast?.error(e?.message);
        },
    });
    const onPageChange = (page) => {
        setPage(page);
    };
    const onLimitChange = (_, limit) => {
        setLimit(limit);
    };
    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   getCheckboxProps: record => ({
    //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     name: record.name,
    //   }),
    // };
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: data?.data?.createdAt
                        ? format(new Date(data?.data?.createdAt), "dd MMMM yyyy, hh:mm a")
                        : "" }) }), data?.data?.endTime && (_jsxs("div", { className: "mt- flex items-start justify-between  w-full ", children: [_jsx("div", {}), _jsxs("div", { className: "mt-10 flex items-end text-left sm:text-3xl text-xl bg-[#141C1F] capitalize", children: ["End Time:", " ", data?.data?.endTime
                                ? format(new Date(data?.data?.endTime), "dd MMMM yyyy, hh:mm a")
                                : ""] })] })), isLoading ? (_jsx(Spin, {})) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 flex items-center", children: _jsx("p", { className: " text-3xl bg-[##141C1F]", children: data?.data?.endTime === null
                                ? "Meeting Ongoing"
                                : "Meeting Ended" }) }), _jsxs("p", { className: "block mt-3 text-3xl bg-[##141C1F] capitalize", children: ["Title: ", data?.data?.title] }), _jsx("div", { className: "mt-5 flex items-center", children: _jsx(Button, { variant: "primary", loading: mutateLoading, disabled: mutateLoading, className: `${data?.data?.endTime ? "hidden" : "block"} cursor-pointer ml-3 px-14 py-4 my-5 rounded-lg bg-[#E71D36] text-[#ffffff]"`, type: "button", title: "End Stand Up", onClick: () => mutate({
                                id,
                                shouldEnd: true,
                            }) }) })] })), _jsxs("div", { className: "mt-10 mb-20 overflow-x-auto", children: [_jsx("div", { className: "grid gap-4", children: data?.data?.participants?.map((i) => (_jsx("div", { onClick: () => {
                                if (!data?.data?.endTime) {
                                    setParticipantId(i.id);
                                    setStateMetric(true);
                                }
                            }, className: `${!data?.data?.endTime ? "cursor-pointer" : "cursor-not-allowed"}`, children: _jsx(Card, { staff: i.staff, participantId: i.id }) }, i.id))) }), _jsx(Table, { size: "small", columns: columns, dataSource: data?.data?.participants, loading: isLoading || isFetching, pagination: {
                            current: page,
                            pageSize: limit,
                            showSizeChanger: true,
                            onChange: onPageChange,
                            total: data?.data?.participants?.length,
                            position: ["bottomRight"],
                            onShowSizeChange: onLimitChange,
                        }, style: { marginTop: "20px" }, rowKey: (record) => record?.id, 
                        // rowSelection={rowSelection}
                        rowClassName: "cursor-pointer", onRow: (val) => ({
                            onClick: () => {
                                if (!data?.data?.endTime) {
                                    setParticipantId(val?.id);
                                    queryClient.invalidateQueries("getMetric");
                                    setStateMetric(true);
                                }
                            },
                        }) })] }), stateMetric ? (_jsx(Modal, { open: stateMetric, onCancel: () => setStateMetric(false), footer: null, maskClosable: false, closable: true, afterClose: () => setStateMetric(false), children: _jsx(Metric, { ...{ setStateMetric, participantId } }) })) : null] }));
};
export default StandUpDetailEnd;
