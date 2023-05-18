import { jsx as _jsx } from "react/jsx-runtime";
import { Pie } from "@ant-design/plots";
const DonutChart = ({ data, color }) => {
    const config = {
        legend: false,
        autoFit: false,
        width: 300,
        height: 300,
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        color,
        radius: 0.6,
        innerRadius: 0.6,
        label: {
            type: "inner",
            offset: "-50%",
            content: "",
        },
        interactions: [
            {
                type: "element-selected",
            },
            {
                type: "element-active",
            },
        ],
        statistic: {
            title: false,
            content: {
                content: "",
            },
        },
    };
    //@ts-ignore
    return _jsx(Pie, { ...config });
};
export default DonutChart;
