import { Table, Dropdown, Tag } from "antd";
import Title from "antd/es/skeleton/Title";
import { format } from "date-fns";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import Input from "../../components/input/Input";

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
          <span className="whitespace-nowrap">
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


const StandUpDetail = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [position, setPosition] = useState<string>('')


  const onFinish = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F] mt-20 sm:text-4xl">Start Meeting</p>

      </div>

      {/* <div className="mt-5 flex items-center">
          <Button variant="primary" className="cursor-pointer px-14 py-4 my-5 rounded-lg bg-[#2B8572] text-[#ffffff]" type="button" title="Start Stand Up" onClick={() => (navigate('/history'))} />

          <Button variant="primary" className="cursor-pointer ml-3 px-14 py-4 my-5 rounded-lg bg-[#E71D36] text-[#ffffff]" type="button" title="End Stand Up" onClick={() => (true)} />
        </div> */}

      <div className="grid sm:grid-cols-2">
        <form onSubmit={onFinish}>
          <Input label='Title' value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter meeting title" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />
          <Input label='12:15AM' value={email} onChange={e => setEmail(e.target.value)} placeholder='12:15AM' type="text" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />
          <Input label='Participation' value={position} onChange={e => setPosition(e.target.value)} type="text" placeholder="Select staff " className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />


          <div className="flex items-center">
            <Button className="text-center rounded-lg mt-10" type="submit" title="Start meeting" onClick={() => { }} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default StandUpDetail
