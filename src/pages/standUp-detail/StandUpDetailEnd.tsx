import { Modal, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components";
import { deleteStandUp, endStandUpUpdate, getStandUp, getStandUpOne } from "../../server/base/standup";
import { toast } from "react-toastify";
import { getMetric, getMetrics } from "../../server/base/metrix";
import Metric from "../../components/otherComponents/Metric";
interface columnsProps {
  title: string
  width: string,
  align: string
  dataIndex: string,
}

const StandUpDetailEnd = () => {
  const { id } = useParams()
  const queryClient = useQueryClient();

  const navigate = useNavigate()

  const [grabid, setGrabID] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateMetric, setStateMetric] = useState<boolean>(false);
  const [participantId, setParticipantId] = useState<string>('');


  // const { data, isLoading, isFetching } = useQuery(["getStandUp", limit, page], () => getStandUp(10))
  const { data, isLoading, isFetching } = useQuery(["getMetrics", page, limit], () => getMetrics(page, limit, id), { refetchOnMount: true })
  // get a single metric from the
  const { data: singleMettric, isLoading: isLoadinsingleMettric } = useQuery(["getMetric", participantId], () => getMetric(id as string, participantId), { refetchOnMount: true, refetchOnReconnect: true })


  const { data: oneData, isLoading: isLoadingOne, isFetching: isFetchingOne } = useQuery(["getStandUpOne", limit, page], () => getStandUpOne(id), { refetchOnMount: true })
  useEffect(() => {
    (oneData?.data && data)
  }, [oneData?.data, id])

  const columns: columnsProps[] | any = [
    {
      title: 'Staff Name',
      render: (val: { name: string, id?: string }) => (
        <span className="cursor-pointer">{val?.name}</span>
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
  console.log(data?.data, 'Metric>')

  const { mutate, isLoading: mutateLoading } = useMutation(endStandUpUpdate, {
    onSuccess: (res) => {
      toast.success(res?.message);
      navigate('/stand-up')
      queryClient.invalidateQueries('getMetrics')
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

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: record => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };

  // console.log(oneData?.data?.endTime, 'oneData?.data?.endTime')
  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt- flex items-start justify-between  w-full ">
        <div></div>
        <div className="mt-10 flex items-end text-left sm:text-3xl text-xl bg-[##141C1F] capitalize">End Time: {format(new Date(!oneData?.data?.endTime === null && oneData?.data?.endTime), "dd MMMM yyyy, hh:mm a")}</div>
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

        <div className="grid md:grid-cols-2 gap-x-4">

          {oneData?.data?.participants?.map((i: { name: string, id: string }) =>

            <blockquote key={i.id} onClick={() => {
              if (!oneData?.data?.endTime) {
                setParticipantId(i.id)
                queryClient.invalidateQueries('getMetric')
                setStateMetric(true)
              }
            }}
              className="rounded-lg bg-[#dce8fd] p-8 mt-10 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center ">

                  <img
                    alt="Man"
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-full object-cover mr-3"
                  />
                  <div className=" text-green-500">
                    {i?.name}
                  </div>
                </div>
                <div className="">
                  {/* <p className="mt-1 text-lg font-medium text-gray-700">Paul Starr</p> */}
                  <div className="flex items-center justify-center ml-3">
                    <Button loading={isLoadinsingleMettric} className="text-center rounded-lg" type="button" title={`${singleMettric?.data === null ? 'Create Metric' : 'Update Metric'}`} />
                  </div>
                </div>
              </div>

              {/* <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              voluptatem alias ut provident sapiente repellendus.
            </p> */}

            </blockquote>
          )}
        </div>

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
                setGrabID(val?.id)
                queryClient.invalidateQueries('getMetric')
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
