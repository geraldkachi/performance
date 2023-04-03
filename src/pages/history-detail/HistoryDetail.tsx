import { Table, Dropdown, Tag, DatePicker } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { Button, Modal, NewStaff, NewTask } from "../../components";


const columns = [
  {
    title: (
      <>
        <div className="semibold">Staff Name</div>
      </>
    ),
    dataIndex: 'name',
    width: '10%',
    align: 'center',
  },
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Joins Early</div>
      </>
    ),
    dataIndex: 'join',
    width: '10%',
    align: 'center',
  },
  {
    title: (
      <>
        <div className="semibold whitespace-nowrap">Present in Meeting</div>
      </>
    ),
    dataIndex: 'role',
    width: '20%',
    align: 'center',
  },
  {
    title: 'Participation',
    dataIndex: 'role',
    width: '20%',
    align: 'center',
  },
  {
    title: 'Attendance',
    dataIndex: 'role',
    width: '20%',
    align: 'center',
  },
  {
    title: 'Task',
    dataIndex: 'role',
    width: '20%',
    align: 'center',
  },
  {
    title: 'Percentage',
    dataIndex: 'role',
    width: '20%',
    align: 'center',
  },
];

const candidature = [
  {
    key: "1",

    name: (
      <>
        <div className="avatar-info flex items-center">
          <span className="whitespace-nowrap">
            Ope Mensorale
          </span>
        </div>
      </>
    ),
    join: (
      <>
        <div className="semibold">yes</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          {/* <Tag icon={<CheckCircleOutlined />} color="#87d068">
            Valid
          </Tag> */}
          50%
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          Finished

        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          On Going
        </div>
      </>
    )
  },

  {
    key: "2",
    name: (
      <>
        <div className="avatar-info">

        </div>

        <div className="avatar-info flex items-center">
          <span>
            <>Lord Gerald</>
          </span>
        </div>
      </>
    ),
    join: (
      <>
        <div className="semibold">yes</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          {/* <Tag icon={<>Baba God Dey Give </>} */}
          {/* // color="#108ee9" */}
          {/* > */}
          50%
          {/* </Tag> */}
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          Yes
        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          Finished
        </div>
      </>
    )
  },
  {
    key: "3",
    name: (
      <>
        <div className="avatar-info">

        </div>
        <div className="avatar-info flex items-center">
          <span>
            <>Lord Gerald</>
          </span>
        </div>
      </>
    ),
    join: (
      <>
        <div className="semibold">yes</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          {/* <Tag icon={<>Baba God Dey Give </>} */}
          {/* // color="#108ee9" */}
          {/* > */}
          50%
          {/* </Tag> */}
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          Yes
        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          Finished
        </div>
      </>
    )
  },
  {
    key: "4",
    name: (
      <>
        <div className="avatar-info">

        </div>

        <div className="avatar-info flex items-center">
          <span>
            <>Lord Gerald</>
          </span>
        </div>
      </>
    ),
    join: (
      <>
        <div className="semibold">yes</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          {/* <Tag icon={<>Baba God Dey Give </>} */}
          {/* // color="#108ee9" */}
          {/* > */}
          50%
          {/* </Tag> */}
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          Yes
        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          Finished
        </div>
      </>
    )
  },
]

const { RangePicker } = DatePicker;

const HistoryDetail = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)


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
          dataSource={candidature}
          style={{ marginTop: '20px' }}
        />
      </div>



      <Modal show={stateNewTask} closeModal={setStateNewTask}>
        <NewTask {...{ setStateNewTask }} />
      </Modal>
    </div>
  )
}

export default HistoryDetail
