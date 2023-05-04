import { useQuery } from "react-query"
import { getStatistic } from "../../server/base/statistics"
import { Table } from "antd"

const Statistics = () => {
  // const { data, isLoading } = useQuery(getStatistic)
  const { data, isLoading, isFetching } = useQuery("getStatistic", () => getStatistic())
  console.log(data, 'data')


  const columns = [
    {
      title: 'Staff Name',
      width: '10%',
      render: (val: any) => (
        <div className=" flex items-center">
          <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">
          </span>
          <span className="capitalize whitespace-nowrap">{`${val?.title}`}</span>
        </div>
      ),
    },
    {
      title: 'Creator Id',
      width: '10%',
      render: (val: any) => (
        <span className="capitalize whitespace-nowrap">{`${val?.creator}`}</span>
      )
    },
  ]

  return (
    <div>
      <div className="mt-10 mb-20 overflow-x-auto">
        <Table
          size="small"
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={data?.data}
          pagination={{
            position: ["bottomRight"],
            // current: page,
            // total: data?.data?.count,
            // pageSize: limit,
            // showSizeChanger: true,
            // onShowSizeChange: onLimitChange,
            // onChange: onPageChange,
          }}
          rowKey={(record) => record?.id}
          style={{ marginTop: '20px' }}
          onRow={(val) => ({
            onClick: () => {
              // navigate(`/stand-up/${val?.id}`)
            }
          })
          }
        />
      </div>
    </div>
  )
}

export default Statistics
