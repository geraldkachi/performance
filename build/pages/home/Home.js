import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { format } from "date-fns";
import { Table, Modal, Spin } from "antd";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import Button from "../../components/button/Button";
import NewTask from "../../components/otherComponents/NewTask";
import NewStaff from "../../components/otherComponents/NewStaff";
import { getMetrics, getOverallPerformance } from "../../server/base/metrix";
const Home = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stateMetric, setStateMetric] = useState(false);
    const [grabId, setGrabID] = useState("");
    const [stateNewTask, setStateNewTask] = useState(false);
    const [stateNewStaff, setStateNewStaff] = useState(false);
    const { data, isLoading, isFetching } = useQuery(["getMetrics", page, limit], () => getMetrics(page, limit), { keepPreviousData: true });
    const { data: overall, isLoading: isLoadingOverall } = useQuery(["overall"], () => getOverallPerformance(), { keepPreviousData: true });
    console.log(overall, "overall");
    const columns = [
        {
            title: "Staff Name",
            render: (val) => (_jsx("span", { className: "cursor-pointer", onClick: () => {
                    setStateMetric(true);
                    setGrabID(val?.id);
                    console.log(val?.id);
                }, children: val?.staffName })),
            width: "10%",
            align: "center",
        },
        {
            title: "Review",
            render: (val) => (_jsx("span", { className: "cursor-pointer", onClick: () => {
                    setStateMetric(true);
                    setGrabID(val?.id);
                }, children: val?.review })),
            width: "10%",
            align: "center",
        },
        {
            title: "Participation",
            dataIndex: "participation",
            width: "20%",
            align: "center",
        },
        {
            title: "Attended Meeting",
            dataIndex: "attendedMeeting",
            render: (val) => (_jsx("span", { className: "cursor-pointer", onClick: () => {
                    setStateMetric(true);
                    setGrabID(val?.id);
                }, children: val?.attendedMeeting === true ? "True" : "False" })),
            width: "5%",
            align: "center",
        },
        {
            title: "Completed Meeting",
            dataIndex: "completedMeeting",
            render: (val) => (_jsx("span", { className: "cursor-pointer", onClick: () => {
                    setStateMetric(true);
                    setGrabID(val?.id);
                }, children: val?.completedMeeting === true ? "True" : "False" })),
            width: "12%",
            align: "center",
        },
        // {
        //   title: 'Actions',
        //   width: '5%',
        //   align: 'center',
        //   dataIndex: 'taco',
        //   render: (_, value) => <Button type="link" onClick={() => null} />
        //   // render: (_, value) => <Button type="link" icon={<EditOutlined />} onClick={() => this.showEditModal(value)}/>
        // }, // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 200
        //       },
        //       legend: {
        //         position: "bottom"
        //       }
        //     }
        //   }
        // ]
    ];
    // console.log(data, 'metrics all')
    const state = {
        options: {
            responsive: [
                {
                    breakpoint: 1000,
                    yaxis: {
                        categories: overall?.data.map((i) => i.staffName),
                    },
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: true,
                                endingShape: "rounded",
                                borderRadius: 5,
                                // columnWidth: '100%'
                            },
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: "rounded",
                    borderRadius: 10,
                    columnWidth: "50%",
                },
            },
            chart: {
                id: "basic-bar",
                width: "100%",
                animations: {
                    enabled: false,
                    speed: 100,
                },
            },
            colors: ["#2B8572"],
            dataLabels: {
                enabled: true,
                position: "top",
                formatter: function (val) {
                    return val;
                },
                horizontal: true,
                offsetX: 0,
                style: {
                    fontSize: "10px",
                    colors: ["#ffffff"],
                },
            },
            grid: {
                show: false,
            },
            xaxis: {
                categories: overall?.data.map((i) => i.staffName),
            },
        },
        series: [
            {
                name: "Performance Metrics Points/Scores",
                // data: [20, 30, 40, 20, 100, 60, 70, 54],
                data: overall?.data.map((i) => i.percent),
            },
        ],
    };
    const onPageChange = (page) => {
        setPage(page);
    };
    const onLimitChange = (limit) => {
        setLimit(limit);
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx("div", { className: "text-right", children: format(new Date(), "dd MMMM yyyy, hh:mm a") }) }), _jsxs("div", { className: "mt-5 flex items-center justify-between", children: [_jsx("p", { className: " text-3xl bg-[##141C1F]", children: "Performance Metric" }), _jsx(Button, { className: "cursor-pointer text-center rounded-lg mt-5", title: "Assign Task", onClick: () => setStateNewTask(true) })] }), _jsx("div", { className: "mt-5 flex items-center justify-between", children: _jsx(Button, { variant: "outline", className: "cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]", type: "submit", title: "Add New Staff", onClick: () => setStateNewStaff(true) }) }), isLoadingOverall ? (_jsx("div", { className: "grid place-items-center", children: _jsx(Spin, {}) })) : (_jsx(Chart, { options: state.options, series: state.series, type: "bar", width: "100%", height: "40%" })), _jsx("div", { className: "mt-10 mb-20  overflow-x-auto", children: _jsx(Table, { rowClassName: (_record, index) => (index % 2 !== 0 ? "stripe" : ""), size: "small", rowKey: (record) => record?.id, loading: isLoading || isFetching, columns: columns, dataSource: data?.data, pagination: {
                        position: ["bottomRight"],
                        current: page,
                        total: data?.data?.count,
                        pageSize: limit,
                        showSizeChanger: true,
                        onShowSizeChange: onLimitChange,
                        onChange: onPageChange,
                    }, style: { marginTop: "20px", padding: "20px" } }) }), _jsx(Modal, { open: stateNewTask, onCancel: () => setStateNewTask(false), footer: null, maskClosable: false, children: _jsx(NewTask, { ...{ setStateNewTask } }) }), _jsx(Modal, { open: stateNewStaff, onCancel: () => setStateNewStaff(false), footer: null, maskClosable: false, closable: true, afterClose: () => setStateNewStaff(false), children: _jsx(NewStaff, { ...{ setStateNewStaff } }) })] }));
};
export default Home;
