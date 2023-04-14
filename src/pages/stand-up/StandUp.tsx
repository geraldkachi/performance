import { Table, Dropdown, Tag } from "antd";
import Title from "antd/es/skeleton/Title";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useQuery } from "react-query";
import { getStandUp } from "../../server/base/standup";
import { useState } from "react";


const columns = [
  {
    title: 'Staff Name',
    dataIndex: 'name',
    width: '10%',
    align: 'center',
    render: (val: any) => (
      <span className="capitalize">{`${val?.firstName} ${val?.lastName}`}</span>
    ),
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

const StandUp = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading, isFetching} = useQuery(["getStandUp", limit, page], () => getStandUp(10))
  console.log(data, 'getStandUp')

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
        <p className=" text-3xl bg-[##141C1F]">Stand Up</p>

      </div>

      <div className="mt-5 flex items-center">
        <Button variant="primary" className="cursor-pointer px-14 py-4 my-5 rounded-lg bg-[#2B8572] text-[#ffffff]" type="button" title="Start Stand Up" onClick={() => (navigate(`/stand-up/${1}`))} />

        {/* <Button variant="primary" className="cursor-pointer ml-3 px-14 py-4 my-5 rounded-lg bg-[#E71D36] text-[#ffffff]" type="button" title="End Stand Up" onClick={() => (true)} /> */}
      </div>


      <div className="mt-10 mb-20 overflow-x-auto">
        <Table
          size="small"
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={data?.data?.standup}
          pagination={{
            position: ["bottomRight"],
            current: page,
            total: data?.data?.count,
            pageSize: limit,
            showSizeChanger: true,
            onShowSizeChange: onLimitChange,
            onChange: onPageChange,
          }}
          rowKey={(record) => record?.id}
          style={{ marginTop: '20px' }}
        />
      </div>
    </div>
  )
}

export default StandUp
