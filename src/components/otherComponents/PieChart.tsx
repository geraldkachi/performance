import { Pie } from "@ant-design/plots";

type Props = {
  color: string[];
  data: { type: string; value: number }[];
};
const DonutChart = ({ data, color }: Props) => {
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
    radius: 0.3,
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
  return <Pie {...config} />;
};

export default DonutChart;
