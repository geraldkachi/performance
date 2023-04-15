import { Table } from "antd";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { getStaffs } from "../../server/base";
import { Button, Modal, NewStaff, NewTask } from "../../components";



const Staff = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false)
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)
  const { data, isLoading, isFetching } = useQuery(["getStaffs", limit, page], () => getStaffs(limit, page), { keepPreviousData: true })
  console.log(data?.data?.staff, 'getStaffs')

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (_: any, limit: number) => {
    setLimit(limit);
  };


const columns = [
  {
    title: 'Staff Name',
    width: '10%',
    render: (val: any) => (
      <span className="capitalize whitespace-nowrap text-start">{`${val?.firstName} ${val?.lastName}`}</span>
    ),
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    width: '10%',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    width: '20%',
    align: 'center',
  },
  {
    title: 'Status',
    width: '12%',
    align: 'center',
    render: (val: any) => (
      <span className="capitalize whitespace-nowrap text-start">{`${val?.isActive}`}</span>
      ),
    },
    {
      title: 'ID',
      // dataIndex: 'id',
      width: '5%',
      // align: 'start',
      render: (val: any) => (
        <span className="capitalize whitespace-nowrap text-start cursor-pointer" onClick={() => navigate(`/staff/${val?.id}`)}>{`${val?.id}`}</span>
        ),
    },
];


  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">Staff</p>

        <Button className="text-center rounded-lg mt-5" title="Assign Task" onClick={() => setStateNewTask(true)} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="outline" className="cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]" type="submit" title="Add New Staff" onClick={() => setStateNewStaff(true)} />
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
          style={{ marginTop: '20px' }}
        />
      </div>

      <div onClick={() => navigate(`/staff/${1}`)}>Staff Detail</div>


      <Modal show={stateNewTask} closeModal={setStateNewTask}>
        <NewTask {...{ setStateNewTask }} />
      </Modal>

      <Modal show={stateNewStaff} closeModal={setStateNewStaff}>
        <NewStaff {...{ setStateNewStaff }} />
      </Modal>
    </div>
  )
}

export default Staff
