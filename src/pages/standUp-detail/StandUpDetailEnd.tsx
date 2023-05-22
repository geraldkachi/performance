import { useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Modal, Spin, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Button, Card } from "../../components";
import Metric from "../../components/otherComponents/Metric";
import { getStandUpOne, endStandUpUpdate } from "../../server/base/standup";
interface columnsProps {
  title: string;
  width: string;
  align: string;
  dataIndex: string;
}

const StandUpDetailEnd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateMetric, setStateMetric] = useState<boolean>(false);
  const [participantId, setParticipantId] = useState<string>("");

  const { data, isLoading, isFetching } = useQuery(
    ["getStandUp", limit, page],
    () => getStandUpOne(id),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );

  const columns: columnsProps[] | any = [
    {
      title: "Staff Name",
      render: (val: { staff: { name: string; role: string } }) => (
        <span className="cursor-pointer">{val?.staff?.name}</span>
      ),
    },
    {
      title: "Staff Role",
      render: (val: { staff: { name: string; role: string } }) => (
        <span className="cursor-pointer">{val?.staff?.role}</span>
      ),
    },
  ];

  const { mutate, isLoading: mutateLoading } = useMutation(endStandUpUpdate, {
    onSuccess: (res) => {
      toast.success(res?.message);
      navigate("/stand-up");
      queryClient.invalidateQueries("getMetrics");
    },
    onError: (e: Error) => {
      toast?.error(e?.message);
    },
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (_: any, limit: number) => {
    setLimit(limit);
  };

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: record => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">
          {data?.data?.createdAt
            ? format(new Date(data?.data?.createdAt), "dd MMMM yyyy, hh:mm a")
            : ""}
        </div>
      </div>

      {data?.data?.endTime && (
        <div className="mt- flex items-start justify-between  w-full ">
          <div></div>
          <div className="mt-10 flex items-end text-left sm:text-3xl text-xl bg-[#141C1F] capitalize">
            End Time:{" "}
            {data?.data?.endTime
              ? format(new Date(data?.data?.endTime), "dd MMMM yyyy, hh:mm a")
              : ""}
          </div>
        </div>
      )}

      {isLoading ? (
        <Spin />
      ) : (
        <>
          <div className="mt-5 flex items-center">
            <p className=" text-3xl bg-[##141C1F]">
              {data?.data?.endTime === null
                ? "Meeting Ongoing"
                : "Meeting Ended"}
            </p>
          </div>
          <p className="block mt-3 text-3xl bg-[##141C1F] capitalize">
            Title: {data?.data?.title}
          </p>

          <div className="mt-5 flex items-center">
            <Button
              variant="primary"
              loading={mutateLoading}
              disabled={mutateLoading}
              className={`${
                data?.data?.endTime ? "hidden" : "block"
              } cursor-pointer ml-3 px-14 py-4 my-5 rounded-lg bg-[#E71D36] text-[#ffffff]"`}
              type="button"
              title="End Stand Up"
              onClick={() =>
                mutate({
                  id,
                  shouldEnd: true,
                })
              }
            />
          </div>
        </>
      )}

      <div className="mt-10 mb-20 overflow-x-auto">
        <div className="grid gap-4">
          {data?.data?.participants?.map(
            (i: { staff: { name: string; role: string }; id: string }) => (
              <div
                onClick={() => {
                  if (!data?.data?.endTime) {
                    setParticipantId(i.id);
                    setStateMetric(true);
                  }
                }}
                key={i.id}
                className={`${
                  !data?.data?.endTime ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <Card staff={i.staff} participantId={i.id} />
              </div>
            )
          )}
        </div>

        <Table
          size="small"
          columns={columns}
          dataSource={data?.data?.participants}
          loading={isLoading || isFetching}
          pagination={{
            current: page,
            pageSize: limit,
            showSizeChanger: true,
            onChange: onPageChange,
            total: data?.data?.participants?.length,
            position: ["bottomRight"],
            onShowSizeChange: onLimitChange,
          }}
          style={{ marginTop: "20px" }}
          rowKey={(record) => record?.id}
          // rowSelection={rowSelection}
          rowClassName="cursor-pointer"
          onRow={(val) => ({
            onClick: () => {
              if (!data?.data?.endTime) {
                setParticipantId(val?.id);
                queryClient.invalidateQueries("getMetric");
                setStateMetric(true);
              }
            },
          })}
        />
      </div>

      {stateMetric ? (
        <Modal
          open={stateMetric}
          onCancel={() => setStateMetric(false)}
          footer={null}
          maskClosable={false}
          closable={true}
          afterClose={() => setStateMetric(false)}
        >
          <Metric {...{ setStateMetric, participantId }} />
        </Modal>
      ) : null}
    </div>
  );
};

export default StandUpDetailEnd;
