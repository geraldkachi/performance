import { useState } from "react";
import { format } from "date-fns";
import { Table, Modal } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AlignType } from "rc-table/lib/interface";

import { Button, NewTask } from "../../components";
import { getMetrics } from "../../server/base/metrix";

const columns = [
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Staff Name</div>
      </>
    ),
    // dataIndex: 'staffName',
    render: (val: { staffName: string }) => (
      <span className="whitespace-nowrap">{val?.staffName}</span>
    ),
    width: "10%",
    align: "center" as AlignType,
  },
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Joins Early</div>
      </>
    ),
    // dataIndex: 'joinedEarly',
    render: (val: { joinedEarly: string }) => (
      <span>{val?.joinedEarly === "true" ? "True" : "False"}</span>
    ),
    width: "10%",
    align: "center" as AlignType,
  },
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Present in Meeting</div>
      </>
    ),
    // dataIndex: 'completedMeeting',
    render: (val: { completedMeeting: string }) => (
      <span>{val?.completedMeeting === "true" ? "True" : "False"}</span>
    ),
    width: "20%",
    align: "center" as AlignType,
  },
  {
    title: "Participation",
    // dataIndex: 'participation',
    render: (val: { participation: string }) => (
      <span>{val?.participation}</span>
    ),
    width: "20%",
    align: "center" as AlignType,
  },
  {
    title: "Attendance",
    // dataIndex: 'attendedMeeting',
    render: (val: { attendedMeeting: string }) => (
      <span>{val?.attendedMeeting === "true" ? "True" : "False"}</span>
    ),
    width: "20%",
    align: "center" as AlignType,
  },
  {
    title: "Task",
    // dataIndex: 'role',
    render: () => <span className="whitespace-nowrap">{"--/--/----"}</span>,
    width: "20%",
    align: "center" as AlignType,
  },
  {
    title: "Percentage",
    dataIndex: "review",
    width: "20%",
    align: "center" as AlignType,
  },
];

const HistoryDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false);

  const { data, isLoading, isFetching } = useQuery(
    ["getMetrics", page, limit],
    () => getMetrics(page, limit, id),
    { keepPreviousData: true }
  );

  console.log(data?.data, "metrics");

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (limit: number) => {
    setLimit(limit);
  };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">
          {format(new Date(), "dd MMMM yyyy, hh:mm a")}
        </div>
      </div>
      email
      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">History</p>

        <Button
          className="text-center rounded-lg mt-5"
          title="Assign Task"
          onClick={() => setStateNewTask(true)}
        />
      </div>
      <div className="mt-5 flex items-center justify-between text-xl">
        Data for 01/01/2021 - 01/01/2022 displayed{" "}
      </div>
      <div className="mt-10 mb-20 overflow-x-auto">
        <Table
          size="small"
          rowKey="id"
          columns={columns}
          dataSource={data?.data}
          loading={isLoading || isFetching}
          pagination={{
            position: ["bottomRight"],
            current: page,
            total: data?.data?.count,
            pageSize: limit,
            showSizeChanger: true,
            onShowSizeChange: onLimitChange,
            onChange: onPageChange,
          }}
          style={{ marginTop: "20px" }}
        />
      </div>
      <Modal
        open={stateNewTask}
        onCancel={() => setStateNewTask(false)}
        footer={null}
        maskClosable={false}
        closable={true}
        afterClose={() => setStateNewTask(false)}
      >
        {/* <Modal show={stateNewTask} closeModal={setStateNewTask}> */}
        <NewTask {...{ setStateNewTask }} />
      </Modal>
    </div>
  );
};

export default HistoryDetail;
