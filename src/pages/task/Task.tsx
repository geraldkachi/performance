import { format } from "date-fns";
import { Table, Modal, Tag } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { AlignType } from "rc-table/lib/interface";
import { useMutation, useQuery } from "react-query";

import { Button, NewStaff, NewTask } from "../../components";
import { getTaskById, getTasks } from "../../server/base/task";

const Task = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false);
  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false);

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

  const { mutate: toDelete, isLoading: deleteLoading } = useMutation(
    getTaskById,
    {
      onSuccess: (res) => {
        toast.success(res?.message || "Admin deleted successfully");
        // queryClient.invalidateQueries("all-admins");
        // close();
      },
      onError: (e: Error) => {
        toast.error(e?.message || "Error deleting admin");
      },
    }
  );

  const { data, isLoading, isFetching } = useQuery(
    ["taskApi", page, limit],
    () => getTasks(page, limit)
  );

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
          {format(new Date(), "dd MMMM yyyy, hh:mm a")}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">Tasks</p>

        <Button
          className="text-center rounded-lg mt-5"
          title="Assign Task"
          onClick={() => setStateNewTask(true)}
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]"
          type="submit"
          title="Add New Staff"
          onClick={() => setStateNewStaff(true)}
        />
      </div>

      <div className="mt-10 mb-20 overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          dataSource={data?.data?.tasks}
          rowKey={(record) => record?.id}
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
          rowClassName={(_record, index) => (index % 2 !== 0 ? "stripe" : "")}
          style={{ marginTop: "20px" }}
        />
      </div>

      <Modal
        open={stateNewTask}
        onCancel={() => setStateNewTask(false)}
        footer={null}
        maskClosable={false}
      >
        {/* <Modal show={stateNewTask} closeModal={setStateNewTask}> */}
        <NewTask {...{ setStateNewTask }} />
      </Modal>

      <Modal
        open={stateNewStaff}
        onCancel={() => setStateNewStaff(false)}
        footer={null}
        maskClosable={false}
      >
        {/* <Modal show={stateNewStaff} closeModal={setStateNewStaff}> */}
        <NewStaff {...{ setStateNewStaff }} />
      </Modal>
    </div>
  );
};

export default Task;
