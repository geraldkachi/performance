import Chart from "react-apexcharts";
import { useState } from "react";
import { format } from "date-fns";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import { Table } from "antd";
import NewStaff from "../../components/otherComponents/NewStaff";
import NewTask from "../../components/otherComponents/NewTask";
interface columnsProps {
  title: string
  dataIndex: string,
  width: string,
  align: string
}
const columns: columnsProps[] = [
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

  // {
  //   title: 'Actions',
  //   width: '5%',
  //   align: 'center',
  //   dataIndex: 'taco',
  //   render: (_, value) => <Button type="link" onClick={() => null} />
  //   // render: (_, value) => <Button type="link" icon={<EditOutlined />} onClick={() => this.showEditModal(value)}/>
  // },
];

const candidature = [
  {
    key: "1",

    name: (
      <>
        <div className="avatar-info flex items-center">
          <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">O M</span> {' '}
          <span className="whitespace-nowrap">
            Ope Mensorale
          </span>
        </div>
      </>
    ),
    email: (
      <>
        <div className="semibold whitespace-nowrap">opemensorale@arvo.com</div>
      </>
    ),
    role: (
      <>
        <div className="ant-progress-project whitespace-nowrap">
          {/* <Tag icon={<CheckCircleOutlined />} color="#87d068">
            Valid
          </Tag> */}
          Dey Wait for Role
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
        <div className="ant-progress-project whitespace-nowrap">
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

const Home = () => {
  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false)
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)

  const state = {

    options: {
    responsive: [{
      breakpoint: 1000,
      yaxis: {
        categories: [
          "Gerald",
          "Kingsley",
          "Ope",
          "Dare",
          "Akan",
          "Prince",
          "Shaguy",
          "Tolulope",

        ],
      },
      options: {
        plotOptions: {
          bar: {
            horizontal: true
          }
        }
      }
    }],
      plotOptions: {
        bar: {
          // horizontal: true, //horizontal bar chart
          horizontal: false, //horizontal bar chart
        },
      },
      chart: {
        id: "basic-bar",
        width: '100%',
        animations: {
          enabled: false, //no animations
          speed: 100,
        },
      },
      colors: ["#2B8572"],
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "Gerald",
          "Kingsley",
          "Ope",
          "Dare",
          "Akan",
          "Prince",
          "Shaguy",
          "Tolulope",

        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [20, 30, 40, 20, 100, 60, 70, 54],
      },
    ],
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200
    //       },
    //       legend: {
    //         position: "bottom"
    //       }
    //     }
    //   }
    // ]

  };


  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">Performance Metric</p>

        <Button className="cursor-pointer text-center rounded-lg mt-5" title="Assign Task" onClick={() => setStateNewTask(true)} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="outline" className="cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]" type="submit" title="Add New Staff" onClick={() => setStateNewStaff(true)} />
      </div>

      {/* <div style={{ width: '100%', display: 'flex' }} className="w-full flex flex-1 mt-10 overflow-x-auto"> */}
        <Chart
          options={state.options}
          series={state.series}

          type="bar"
          width="100%"
          height={'40%'}

        />
      {/* </div> */}

      <div className="mt-10 mb-20  overflow-x-auto">
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
          style={{ marginTop: '20px', padding: '20px', }}
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

export default Home
