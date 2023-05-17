import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { Table, Modal, Tag } from "antd";
import { useNavigate } from "react-router";
import { AlignType } from "rc-table/lib/interface";

import { getStaffs } from "../../server/base";
import { Button, NewStaff, NewTask } from "../../components";

const Staff = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [stateNewTask, setStateNewTask] = useState<boolean>(false);
  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false);
  const { data, isLoading, isFetching } = useQuery(
    ["getStaffs", limit, page],
    () => getStaffs(limit, page),
    { keepPreviousData: true }
  );

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (_: any, limit: number) => {
    setLimit(limit);
  };

  const columns = [
    {
      title: "Staff Name",
      width: "10%",
      render: (val: any) => (
        <span className="capitalize whitespace-nowrap text-start">{`${val?.firstName} ${val?.lastName}`}</span>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      width: "10%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "20%",
      align: "center" as AlignType,
      render: (val: string) => (
        <span className="capitalize">
          {val === "admin" ? "admin" : "super admin"}
        </span>
      ),
    },
    {
      title: "Status",
      width: "12%",
      dataIndex: "isActive",
      align: "center" as AlignType,
      render: (val: boolean) => (
        <Tag color={val ? "green" : "red"}>{val ? "Active" : "Inactive"}</Tag>
      ),
    },
  ];

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
          rowKey={(record) => record?.id}
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={data?.data?.staff}
          pagination={{
            position: ["bottomRight"],
            current: page,
            total: data?.data?.count,
            pageSize: limit,
            showSizeChanger: true,
            onShowSizeChange: onLimitChange,
            onChange: onPageChange,
          }}
          rowClassName={"cursor-pointer"}
          onRow={(val) => ({
            onClick: () => {
              navigate(`/staff/${val?.id}`);
            },
          })}
          style={{ marginTop: "20px" }}
        />
      </div>

      <Modal
        open={stateNewTask}
        onCancel={() => setStateNewTask(false)}
        footer={null}
        maskClosable={false}
      >
        <NewTask {...{ setStateNewTask }} />
      </Modal>
      <Modal
        open={stateNewStaff}
        onCancel={() => setStateNewStaff(false)}
        footer={null}
        maskClosable={false}
      >
        <NewStaff {...{ setStateNewStaff }} />
      </Modal>
    </div>
  );
};

export default Staff;
