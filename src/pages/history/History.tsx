import { Table, Dropdown, Tag, DatePicker } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, NewStaff, NewTask } from "../../components";


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

const { RangePicker } = DatePicker;

const History = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState<string[]>([]);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)
  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false)
  const [filter, setFilter] = useState({ fromDate: "", toDate: "" });


  const columns = [
    {
      title: 'Stand Up Date',
      dataIndex: 'email',
      // render: (data: any) => (
      //   <span
      //     className="text-[#A362F8] underline cursor-pointer"
      //     onClick={() => navigate(`/history/${1}`)}
      //   >
      //     {data?.reference}
      //   </span>
      // ),
      width: '10%',
      align: 'center',
    },
    {
      title: 'Participants',
      dataIndex: 'email',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Tasks',
      dataIndex: 'role',
      width: '20%',
      align: 'center',
    },
  ];

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">History</p>

        <Button className="text-center rounded-lg mt-5" title="Assign Task" onClick={() => setStateNewTask(true)} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="outline" className="cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]" type="submit" title="Add New Staff" onClick={() => setStateNewStaff(true)} />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <RangePicker
            placeholder={["From date", "To date"]}
            onChange={(_a, b) => (b)}
          /> */}
          <span className="flex items-center">
            <span className="hidden lg:flex mr-2 text-sm text-[#141C1F]"> Start Date</span>
            {' '}
            <DatePicker renderExtraFooter={() => 'extra footer'}
              showTime={{ format: "HH:mm" }}
              name="StartEndDate"
              format="DD/MM/YYYY HH:mm"
              style={{ padding: '16px' }}
              className='createDateRangePicker'
            />
          </span>
          {' '} {' '}
          <span className="flex items-center">
            <span className="hidden lg:flex mr-2 text-sm text-[#141C1F]">End Date</span>
            {' '}
            <DatePicker renderExtraFooter={() => 'extra footer'}
              showTime={{ format: "HH:mm" }}
              name="StartEndDate"
              format="DD/MM/YYYY HH:mm"
              style={{ padding: '16px' }}
              className='createDateRangePicker'
            />
          </span>
          {' '} {' '}
          <div className="mx-3">
            <Button title='Filter' className="rounded-lg px-10" size="sm"
              onClick={() => setFilter({ fromDate: dates[0], toDate: dates[1] })}

            />
          </div>
        </div>
      </div>


<div onClick={() => navigate(`/history/${1}`)}>History Detail</div>

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

      <Modal show={stateNewStaff} closeModal={setStateNewStaff}>
        <NewStaff {...{ setStateNewStaff }} />
      </Modal>
    </div>
  )
}

export default History
