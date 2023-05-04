import { Modal, Spin, Table } from "antd";
import { useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components";
import { deleteStandUp, endStandUpUpdate, getStandUp, getStandUpOne } from "../../server/base/standup";
import { toast } from "react-toastify";
import { getMetrics } from "../../server/base/metrix";
import Metric from "../../components/otherComponents/Metric";
interface columnsProps {
  title: string
  width: string,
  align: string
  dataIndex: string,
}
///////////////////////////////
// const columns = [
//   {
//     title: 'Staff Name',
//     // dataIndex: 'title',
//     width: '10%',
//     render: (val: any) => (
//       <div className=" flex items-center">
//         <span className="bg-[#2B8572] w-10 h-10 rounded-full text-center flex items-center justify-center text-white mr-2">
//           {/* {`${val?.title
//               .split(' ')[0]
//               .charAt(0)}${val?.title
//                 .split(' ')[1]
//                 .charAt(0)}`} */}
//         </span>
//         <span className="capitalize whitespace-nowrap">{`${val?.title}`}</span>
//       </div>
//     ),
//   },
//   {
//     title: 'Creator Id',
//     // dataIndex: 'creator',
//     width: '10%',
//     // align: 'center',
//     render: (val: any) => (
//       <span className="capitalize whitespace-nowrap">{`${val?.creator}`}</span>
//     )
//   },
//   {
//     title: 'Created At',
//     // dataIndex: 'createdAt',
//     width: '20%',
//     // align: 'center',
//     render: (val: any) => (
//       <span className="capitalize whitespace-nowrap">{`${val?.createdAt ? format(new Date(val?.createdAt), "dd MMMM yyyy, hh:mm a") : "--/--/----"}`}</span>
//     )
//   },
//   // {
//   //   title: 'Tasks',
//   //   dataIndex: 'task',
//   //   width: '5%',
//   //   align: 'center',
//   // },
//   // {
//   //   title: 'Status',
//   //   dataIndex: 'status',
//   //   width: '12%',
//   //   align: 'center',
//   // },
// ];
const StandUpDetailEnd = () => {
  const { id } = useParams()
  const queryClient = useQueryClient();

  const navigate = useNavigate()

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateMetric, setStateMetric] = useState<boolean>(false);
  const [participantId, setParticipantId] = useState<string>('');



  // const { data, isLoading, isFetching } = useQuery(["getStandUp", limit, page], () => getStandUp(10))
  const { data, isLoading, isFetching } = useQuery(["getMetrics", page, limit], () => getMetrics(page, limit, id), { keepPreviousData: true })

  const { data: oneData, isLoading: isLoadingOne, isFetching: isFetchingOne } = useQuery(["getStandUpOne", limit, page], () => getStandUpOne(id))
  const columns: columnsProps[] | any = [
    {
      title: 'Staff Name',
      render: (val: { name: string, id?: string }) => (
        <span className="cursor-pointer" onClick={() => {
          // (!oneData?.data?.endDate === null && setStateMetric(true))
          // setStateMetric(true)
          // setParticipantId(val?.id)
          // console.log(val, '222')
          // console.log(val?.id)
        }}>{val?.name}</span>
      ),
      width: '10%',
      align: 'center',
    },

    {
      title: 'Participants',
      dataIndex: 'participation',
      render: (val: { participation: string, id: string }) => (
        <span className="cursor-pointer" onClick={() => {
          (!oneData?.data?.endDate === null && setStateMetric(true))
          setParticipantId(val?.id)
        }}>{oneData?.data?.participants?.length}</span>
      ),
      width: '20%',
      align: 'center',
    },


  ];
  // console.log(oneData?.data, 'dtatatatat')
  // console.log(data?.data, 'Metric>')

  const { mutate, isLoading: mutateLoading } = useMutation(endStandUpUpdate, {
    onSuccess: (res) => {
      toast.success(res?.message);
      // navigate('/stand-up')
    },
    onError: (e: Error) => {
      toast?.error(e?.message);
    },
  })
  // console.log(data?.data[0], 'getStandUp')

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (_: any, limit: number) => {
    setLimit(limit);
  };

  // console.log(oneData, 'oneData')

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  console.log(oneData?.data?.endTime, 'oneData?.data?.endTime')
  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      {isLoadingOne ? <Spin />
        :
        <>
      <div className="mt-5 flex items-center">
        <p className=" text-3xl bg-[##141C1F]">{oneData?.data?.endTime === null ? 'Meeting ongoing' : 'Meeting Ended'}</p>
      </div>
          <p className="block mt-3 text-3xl bg-[##141C1F] capitalize">Title: {oneData?.data?.title}</p>

          <div className="mt-5 flex items-center">
            {/* <Button variant="primary" className="cursor-pointer px-14 py-4 my-5 rounded-lg bg-[#2B8572] text-[#ffffff]" type="button" title="Start Stand Up" onClick={() => (navigate(`/stand-up/${'start-standup'}`))} /> */}
            {/* {oneData?.data?.endTime === null ? ( */}
            <Button variant="primary" loading={mutateLoading} disabled={mutateLoading} className={`${oneData?.data?.endTime ? 'hidden' : 'block'} cursor-pointer ml-3 px-14 py-4 my-5 rounded-lg bg-[#E71D36] text-[#ffffff]"`} type="button" title="End Stand Up"
              onClick={() => mutate({
                id,
                shouldEnd: true
            })}
            />
          </div>
        </>
      }


      <div className="mt-10 mb-20 overflow-x-auto">
        <Table
          size="small"
          columns={columns}
          // dataSource={data?.data}
          dataSource={oneData?.data?.participants}
          // dataSource={data?.data?.standup}
          loading={isLoading || isFetching}
          pagination={{
            current: page,
            pageSize: limit,
            showSizeChanger: true,
            onChange: onPageChange,
            total: data?.data?.count,
            position: ["bottomRight"],
            onShowSizeChange: onLimitChange,
          }}
          style={{ marginTop: '20px' }}
          rowKey={(record) => record?.id}
          // rowSelection={rowSelection}
          rowClassName="cursor-pointer"
          onRow={(val) => ({
            onClick: () => {
              if (!oneData?.data?.endTime) {
                setParticipantId(val?.id)
                setStateMetric(true)
              }
            },
          })
          }
        />
      </div>

      {stateMetric ? <Modal open={stateMetric} onCancel={() => setStateMetric(false)} footer={null} maskClosable={false} closable={true} afterClose={() => setStateMetric(false)}>
        <Metric {...{ setStateMetric, participantId }} />
      </Modal> : null}
    </div>
  )
}

export default StandUpDetailEnd
