import { Table, Dropdown, Tag, DatePicker, Modal } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { Button, NewStaff, NewTask } from "../../components";
import { useParams } from "react-router-dom";
import { getMetrics } from "../../server/base/metrix";
import { useQuery } from "react-query";


const columns = [
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Staff Name</div>
      </>
    ),
    // dataIndex: 'staffName',
    render: (val: {staffName: string}) => (
      <span className="whitespace-nowrap">{val?.staffName}</span>
    ),
    width: '10%',
    align: 'center',
  },
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Joins Early</div>
      </>
    ),
    // dataIndex: 'joinedEarly',
    render: (val:{ joinedEarly: string}) => (
      <span>{val?.joinedEarly === "true" ? "True" : "False"}</span>
    ),
    width: '10%',
    align: 'center',
  },
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Present in Meeting</div>
      </>
    ),
    // dataIndex: 'completedMeeting',
    render: (val: {completedMeeting: string}) => (
      <span>{val?.completedMeeting === "true" ? "True" : "False"}</span>
    ),
    width: '20%',
    align: 'center',
  },
  {
    title: 'Participation',
    // dataIndex: 'participation',
    render: (val: {participation: string}) => (
      <span>{val?.participation}</span>
    ),
    width: '20%',
    align: 'center',
  },
  {
    title: 'Attendance',
    // dataIndex: 'attendedMeeting',
    render: (val: {attendedMeeting: string}) => (
      <span>{val?.attendedMeeting === 'true' ? "True" : "False"}</span>
    ),
    width: '20%',
    align: 'center',
  },
  {
    title: 'Task',
    // dataIndex: 'role',
    render: () => (
      <span className="whitespace-nowrap">{'--/--/----'}</span>
    ),
    width: '20%',
    align: 'center',
  },
  {
    title: 'Percentage',
    dataIndex: 'review',
    width: '20%',
    align: 'center',
  },
];


const { RangePicker } = DatePicker;

const HistoryDetail = () => {
  const { id } = useParams()
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [dates, setDates] = useState<string[]>([]);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)

  const { data, isLoading, isFetching } = useQuery(["getMetrics", page, limit], () => getMetrics(page, limit, id), { keepPreviousData: true })

  console.log(data?.data, 'metrics')

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (limit: number) => {
    setLimit(limit);
  };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>email

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">History</p>

        <Button className="text-center rounded-lg mt-5" title="Assign Task" onClick={() => setStateNewTask(true)} />
      </div>

      <div className="mt-5 flex items-center justify-between text-xl">Data for 01/01/2021 - 01/01/2022 displayed </div>




      <div className="mt-10 mb-20 overflow-x-auto">
        <Table
          // dataSource={data?.data?.customers}
          // columns={columns}
          // // loading={}
          // rowClassName={(_record, index) => (index % 2 !== 0 ? "stripe" : "")}
          // pagination={{
          //   position: ["bottomRight"],
          //   current: page,
          //   total: data?.data?.count,
          //   pageSize: limit,
          //   showSizeChanger: true,
          //   onShowSizeChange: onLimitChange,
          //   onChange: onPageChange,
          // }}
          // rowKey={(record) => record?.id}

          size="small"
          rowKey="id"
          pagination={false}
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
          style={{ marginTop: '20px' }}
        />
      </div>


      <Modal open={stateNewTask} onCancel={() => setStateNewTask(false)} footer={null} maskClosable={false} closable={true} afterClose={() => setStateNewTask(false)}>

      {/* <Modal show={stateNewTask} closeModal={setStateNewTask}> */}
        <NewTask {...{ setStateNewTask }} />
      </Modal>
    </div>
  )
}

export default HistoryDetail
