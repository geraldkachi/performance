import { format } from "date-fns";
import { useState } from "react";
import { Table, Modal } from "antd";
import { Pie } from "@ant-design/plots";
import { AlignType } from "rc-table/lib/interface";
import { Button, NewTask } from "../../components";

type DataType =
  | "new"
  | "evaluating"
  | "ongoing"
  | "finished"
  | "archived"
  | "Task Rate";

interface PieChartData {
  type: DataType;
  value: number;
}

const pieChartData: PieChartData[] = [
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
    title: false as const,
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
    align: "center" as AlignType,
  },
  {
    title: "Email Address",
    dataIndex: "email",
    width: "10%",
    align: "center" as AlignType,
  },
  {
    title: "Role",
    dataIndex: "role",
    width: "20%",
    align: "center" as AlignType,
  },
  {
    title: "Tasks",
    dataIndex: "task",
    width: "5%",
    align: "center" as AlignType,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "12%",
    align: "center" as AlignType,
  },
];

const StaffDetail = () => {
  // const {id} = useParams()
  const [stateNewTask, setStateNewTask] = useState<boolean>(false);
  // const { data, isLoading, isFetching } = useQuery(["getTaskById", id], () => getTaskById(id), { keepPreviousData: true })
  // console.log(data, 'getTaskById')
  // console.log(id, 'id params')

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">
          {format(new Date(), "dd MMMM yyyy, hh:mm a")}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">Staff</p>

        <Button
          className="text-center rounded-lg mt-5"
          title="Assign Task"
          onClick={() => setStateNewTask(true)}
        />
      </div>

      <div className="mt-5 flex items-center justify-between text-xl">
        Adimora Lord Gerald{" "}
      </div>

      <div className="grid md:grid-cols-3 gap-x-4">
        <div className="rounded-2xl p-3 shadow-md">
          <Pie {...config} />
        </div>
        <div className="rounded-2xl p-3 shadow-md">
          <Pie {...config} />
        </div>
        <div className="rounded-2xl p-3 shadow-md">
          <Pie {...config} />
        </div>
      </div>

      <div className="mt-10 mb-20 overflow-x-auto">
        <div className="flex items-center text-2xl mt-3">Recent Tasks</div>
        <Table
          size="small"
          columns={columns}
          dataSource={[]}
          // loading={isLoading || isFetching }
          rowKey={(record: { id: string }) => record?.id}
          style={{ marginTop: "20px" }}
        />
      </div>

      {/* <Modal show={stateNewTask} closeModal={setStateNewTask}> */}
      <Modal
        open={stateNewTask}
        onCancel={() => setStateNewTask(false)}
        footer={null}
        maskClosable={false}
      >
        <NewTask {...{ setStateNewTask }} />
      </Modal>
    </div>
  );
};

export default StaffDetail;
