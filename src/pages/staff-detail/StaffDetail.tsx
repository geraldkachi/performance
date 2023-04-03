import { Table, Dropdown, Tag, DatePicker, Modal } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { Button, NewStaff, NewTask } from "../../components";
import { Pie } from "@ant-design/plots";


type DataType = "new" | "evaluating" | "ongoing" | "finished" | "archived" | "Task Rate";

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
    value: 22
  },
  {
    type: "Task Rate",
    value: 22
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
  color: ['#ffffff', '#52C93F'],
  border: 1,
  label: {
    type: "inner",
    offset: "-50%",
    content: "{value}",
    style: {
      textAlign: "center",
      fontSize: 10
    }
  },
  interactions: [{ type: "element-selected" }, { type: "element-active" }],
  statistic: {
    title: false as const,
    content: {
      style: {
        whiteSpace: "pre-wrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      },
      formatter: function formatter() {
        // return `total\n134`;
        return;
      }
    }
  }
};

const columns = [
  {
    title: 'Staff Name',
    dataIndex: 'name',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    width: '20%',
    align: 'center',
  },
  {
    title: 'Tasks',
    dataIndex: 'task',
    width: '5%',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '12%',
    align: 'center',
  },
];

const candidature = [
  {
    key: "1",

    name: (
      <>
        <div className="avatar-info flex items-center">
          <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">O M</span> {' '}
          <span>
            Ope Mensorale
          </span>
        </div>
      </>
    ),
    email: (
      <>
        <div className="semibold">opemensorale@arvo.com</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project">
          {/* <Tag icon={<CheckCircleOutlined />} color="#87d068">
            Valid
          </Tag> */}
          Dey Wait for Role
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project">
          Finished

        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project">
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
          <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">L G</span> {' '}
          <span>
            <>Lord Gerald</>
          </span>
        </div>
      </>
    ),
    email: (
      <>
        <div className="semibold">topgee@tate.com</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project">
          {/* <Tag icon={<>Baba God Dey Give </>} */}
          {/* // color="#108ee9" */}
          {/* > */}
          Tech Lead
          {/* </Tag> */}
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project">
          Yes
        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project">
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
          <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">L G</span> {' '}
          <span>
            <>Lord Gerald</>
          </span>
        </div>
      </>
    ),
    email: (
      <>
        <div className="semibold">topgee@tate.com</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project">
          {/* <Tag icon={<>Baba God Dey Give </>} */}
          {/* // color="#108ee9" */}
          {/* > */}
          Tech Lead
          {/* </Tag> */}
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project">
          Yes
        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project">
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
          <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">L G</span> {' '}
          <span>
            <>Lord Gerald</>
          </span>
        </div>
      </>
    ),
    email: (
      <>
        <div className="semibold">topgee@tate.com</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project">
          {/* <Tag icon={<>Baba God Dey Give </>} */}
          {/* // color="#108ee9" */}
          {/* > */}
          Tech Lead
          {/* </Tag> */}
        </div>
      </>
    ),
    task: (
      <>
        <div className="ant-progress-project">
          Yes
        </div>
      </>
    ),
    status: (
      <>
        <div className="ant-progress-project">
          Finished
        </div>
      </>
    )
  },
]

const StaffDetail = () => {
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">Staff</p>

        <Button className="text-center rounded-lg mt-5" title="Assign Task" onClick={() => setStateNewTask(true)} />
      </div>

      <div className="mt-5 flex items-center justify-between text-xl">Adimora Lord Gerald  </div>


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
        <div className="flex items-center text-2xl mt-3">
          Recent Tasks
        </div>
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


      {/* <Modal show={stateNewTask} closeModal={setStateNewTask}> */}
      <Modal open={stateNewTask} onCancel={() => setStateNewTask(false)} footer={null} maskClosable={false}>
        <NewTask {...{ setStateNewTask }} />
      </Modal>
    </div>
  )
}

export default StaffDetail
