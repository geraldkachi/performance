import { useState } from "react";
import { format } from "date-fns";
import { useQueries } from "react-query";
import { useParams } from "react-router";
import { Table, Modal, Spin, Tag } from "antd";
import { AlignType } from "rc-table/lib/interface";
import Arrow from "../../assets/svg/Arrow";
import { getStaff } from "../../server/base";
import DonutChart from "../../components/Pie";
import { getTasks } from "../../server/base/task";
import { Button, NewTask } from "../../components";
import { getStaffMetric } from "../../server/base/metrix";

const columns = [
  {
    title: "Task",
    dataIndex: "name",
    width: "10%",
    align: "center" as AlignType,
    render: (val: string) => (
      <div className=" flex items-center">
        <span className="capitalize whitespace-nowrap">{`${val}`}</span>
      </div>
    ),
  },
  {
    title: "Dependants",
    dataIndex: "dependants",
    width: "10%",
    align: "center" as AlignType,
    render: (val: string[]) => (
      <span className="capitalize">
        {val.length > 1 ? `${val[0]} + ${val.length - 1}` : val[0]}
      </span>
    ),
  },
  {
    title: "AssignedBy Id",
    width: "10%",
    align: "center" as AlignType,
    render: (val: any) => (
      <span className="capitalize whitespace-nowrap">{`${val?.assignedBy}`}</span>
    ),
  },
  {
    title: "Start Date",
    width: "5%",
    render: (val: any) => (
      <span className="capitalize whitespace-nowrap text-start cursor-pointer">{`${format(
        new Date(val?.startDate),
        "MM/dd/yyyy - h:mma"
      )}`}</span>
    ),
  },
  {
    title: "End Date",
    width: "5%",
    render: (val: any) => (
      <span className="capitalize whitespace-nowrap text-start cursor-pointer">{`${format(
        new Date(val.endDate),
        "MM/dd/yyyy - h:mma"
      )}`}</span>
    ),
  },
  {
    title: "Status",
    width: "5%",
    dataIndex: "status",
    render: (val: string) => (
      <Tag
        color={
          val === "not-started" ? "red" : val === "ongoing" ? "blue" : "green"
        }
      >
        {val}
      </Tag>
    ),
  },
];

const swapper = (val: string) => {
  const words = val?.split(/(?=[A-Z])/);
  return words?.join(" ");
};

const StaffDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false);

  const [staff, metric, task] = useQueries([
    {
      queryKey: `staff-${id}`,
      queryFn: () => getStaff(id as string),
      enabled: !!id,
    },
    {
      queryKey: `staff-metric-${id}`,
      queryFn: () => getStaffMetric(id as string),
      enabled: !!id,
    },
    {
      queryKey: ["taskApi", page, limit, id],
      queryFn: () => getTasks(page, limit, id),
      enabled: !!id,
    },
  ]);

  const { data: staffData, isLoading: staffLoading } = staff;
  const { data: metricData, isLoading: metricLoading } = metric;
  const {
    data: taskData,
    isLoading: taskLoading,
    isFetching: taskFetching,
  } = task;

  console.log(taskData);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (_: any, limit: number) => {
    setLimit(limit);
  };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">
          {staffLoading ? (
            <Spin />
          ) : (
            format(
              new Date(staffData?.data?.createdAt),
              "dd MMMM yyyy, hh:mm a"
            )
          )}
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

      <div className="mt-5 flex items-center justify-between text-xl font-bold capitalize">
        {staffLoading ? (
          <Spin />
        ) : (
          `${staffData?.data?.firstName} ${staffData?.data?.lastName}`
        )}
      </div>

      <div
        className={`flex gap-x-4 w-full overflow-auto ${
          metricLoading ? "justify-center items-center" : ""
        }`}
      >
        {metricLoading ? (
          <Spin />
        ) : (
          metricData?.data &&
          Object.keys(metricData?.data).map((item, i: number) => (
            <div className="rounded-2xl p-3 shadow-md" key={i}>
              <DonutChart
                data={[
                  { type: "success", value: metricData?.data[item] },
                  {
                    type: "failure",
                    value: 100 - metricData?.data[item],
                  },
                ]}
                color={["#52C93F", "#C8C6CD"]}
              />
              {metricLoading ? (
                <Spin />
              ) : (
                <div className="flex items-center justify-evenly">
                  <p className="capitalize text-[#1A1919] text-[16px]">
                    {swapper(item)}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="capitalize text-[#1A1919] text-[16px]">
                      {Math.round(metricData?.data[item])}%
                    </p>
                    <div
                      className={`${
                        metricData?.data[item] < 50 && "rotate-180"
                      }`}
                    >
                      <Arrow
                        fill={
                          metricData?.data[item] < 50 ? "#F46036" : "#52C93F"
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-10 mb-20 overflow-x-auto">
        <div className="flex items-center text-2xl mt-3">Recent Tasks</div>
        <Table
          size="small"
          columns={columns}
          dataSource={taskData?.data?.tasks}
          loading={taskLoading || taskFetching}
          rowKey={(record: { id: string }) => record?.id}
          style={{ marginTop: "20px" }}
          pagination={{
            position: ["bottomRight"],
            current: page,
            total: taskData?.data?.count,
            pageSize: limit,
            showSizeChanger: true,
            onShowSizeChange: onLimitChange,
            onChange: onPageChange,
          }}
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
