import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from "react-query";
import { getStatistics } from "../../server/base/statistics";
import { Table } from "antd";
const Statistics = () => {
    // const { data, isLoading } = useQuery(getStatistic)
    const { data, isLoading, isFetching } = useQuery("getStatistic", () => getStatistics());
    console.log(data, "data");
    const columns = [
        {
            title: "Staff Name",
            width: "10%",
            render: (val) => (_jsx("div", { className: " flex items-center", children: _jsx("span", { className: "capitalize whitespace-nowrap", children: `${val?.staffId}` }) })),
        },
        // {
        //   title: 'Creator Id',
        //   width: '10%',
        //   render: (val: any) => (
        //     <span className="capitalize whitespace-nowrap">{`${val?.creator}`}</span>
        //   )
        // },
    ];
    return (_jsx("div", { children: _jsx("div", { className: "mt-10 mb-20 overflow-x-auto", children: _jsx(Table, { size: "small", loading: isLoading || isFetching, columns: columns, dataSource: data?.data, pagination: {
                    position: ["bottomRight"],
                    // current: page,
                    // total: data?.data?.count,
                    // pageSize: limit,
                    // showSizeChanger: true,
                    // onShowSizeChange: onLimitChange,
                    // onChange: onPageChange,
                }, rowKey: (record) => record?.id, style: { marginTop: "20px" }, onRow: (val) => ({
                    onClick: () => {
                        // navigate(`/stand-up/${val?.id}`)
                    },
                }) }) }) }));
};
export default Statistics;
