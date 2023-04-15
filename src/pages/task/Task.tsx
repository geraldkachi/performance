import { Table } from "antd";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";

import { getTasks } from "../../server/base/task";
import { Button, Modal, NewStaff, NewTask } from "../../components";
import { useParams } from "react-router-dom";

const columns = [
  {
    title: 'Staff Name',
    // dataIndex: 'name',
    width: '10%',
    align: 'center',
    render: (val: any) => (
      <div className=" flex items-center">
        <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">
          {`${val?.name
            .split(' ')[0]
            .charAt(0)}${val?.name
              .split(' ')[1]
              .charAt(0)}`}
        </span>
        <span className="capitalize whitespace-nowrap">{`${val?.name}`}</span>
      </div>
    ),
  },
  {
    title: 'Staff Id',
    // dataIndex: 'staffId',
    width: '10%',
    align: 'center',
    render: (val: any) => (
      <span className="capitalize whitespace-nowrap">{`${val?.staffId}`}</span>
    )
  },
  {
    title: 'AssignedBy Id',
    // dataIndex: 'staffId',
    width: '10%',
    align: 'center',
    render: (val: any) => (
      <span className="capitalize whitespace-nowrap">{`${val?.assignedBy}`}</span>
    )
  },
  // {
  //   title: 'Role',
  //   dataIndex: 'role',
  //   width: '20%',
  //   align: 'center',
  // },
  // {
  //   title: 'Tasks',
  //   dataIndex: 'task',
  //   width: '5%',
  //   align: 'center',
  // },
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  //   width: '12%',
  //   align: 'center',
  // },
];


const Task = () => {
  const {id} = useParams()
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)
  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false)

  const { data: taskId, isLoading: loadingTaskId, isFetching: isFetchingTaskId } = useQuery(["getTaskById", id], () => getTaskById(id), { keepPreviousData: true })
  console.log(taskId, 'getTaskById')
  console.log(id, 'id params')

  const { data, isLoading, isFetching } = useQuery(["taskApi", page, limit], () => getTasks(page, limit))
  console.log(data, 'data for task')

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (_: any, limit: number) => {
    setLimit(limit);
  };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">Tasks</p>

        <Button className="text-center rounded-lg mt-5" title="Assign Task" onClick={() => setStateNewTask(true)} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="outline" className="cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]" type="submit" title="Add New Staff" onClick={() => setStateNewStaff(true)} />
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
          style={{ marginTop: '20px' }}
        />
      </div>


      <Modal show={stateNewTask} closeModal={setStateNewTask}>
        <NewTask {...{ setStateNewTask }} />
      </Modal>

      <Modal show={stateNewStaff} closeModal={setStateNewStaff}>
        <NewStaff {...{ setStateNewStaff }} />
      </Modal>
    </div>
  )
}

export default Task
