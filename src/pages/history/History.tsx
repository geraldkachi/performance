import { format } from "date-fns";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Table, DatePicker, Modal } from "antd";
import { AlignType } from "rc-table/lib/interface";
import { getStandUp } from "../../server/base/standup";
import { Button, NewStaff, NewTask } from "../../components";

const History = () => {
  const navigate = useNavigate();
  const [dates, _setDates] = useState<string[]>([]);
  const [stateNewTask, setStateNewTask] = useState<boolean>(false);
  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false);
  const [filter, setFilter] = useState({ fromDate: "", toDate: "" });

  const [page, _setPage] = useState<number>(1);
  const [limit, _setLimit] = useState<number>(10);

  const { data, isLoading, isFetching } = useQuery(
    ["getStandUp", limit, page],
    () => getStandUp(limit)
  );

  console.log(data?.data?.standup, "history");

  const columns = [
    {
      title: "Stand Up Date",
      // dataIndex: 'startTime',
      render: (val: any) => (
        <span
          onClick={() => navigate(`/history/${val?.id}`)}
          className="cursor-pointer capitalize whitespace-nowrap"
        >{`${
          val?.createdAt
            ? format(new Date(val?.createdAt), "dd MMMM yyyy, hh:mm a")
            : "--/--/----"
        }`}</span>
      ),
      width: "10%",
      align: "center" as AlignType,
    },
    {
      title: "Participants",
      dataIndex: "creator",
      width: "10%",
      align: "center" as AlignType,
    },
    {
      title: "Tasks",
      render: (val: any) => (
        <span
          onClick={() => navigate(`/history/${val?.id}`)}
          className="cursor-pointer capitalize whitespace-nowrap"
        >{`--/--/----`}</span>
      ),
      width: "20%",
      align: "center" as AlignType,
    },
  ];

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">
          {format(new Date(), "dd MMMM yyyy, hh:mm a")}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F]">History</p>

        <Button
          className="text-center rounded-lg mt-5"
          title="Assign Task"
          onClick={() => setStateNewTask(true)}
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-[#f6fafa] px-14 py-4 my-5 rounded-lg bg-[#ffffff] text-[#2B8572] border border-[#2B8572]"
          type="submit"
          title="Add New Staff"
          onClick={() => setStateNewStaff(true)}
        />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <RangePicker
            placeholder={["From date", "To date"]}
            onChange={(_a, b) => (b)}
          /> */}
          <span className="flex items-center">
            <span className="hidden lg:flex mr-2 text-sm text-[#141C1F]">
              {" "}
              Start Date
            </span>{" "}
            <DatePicker
              renderExtraFooter={() => "extra footer"}
              showTime={{ format: "HH:mm" }}
              name="StartEndDate"
              format="DD/MM/YYYY HH:mm"
              style={{ padding: "16px" }}
              className="createDateRangePicker"
            />
          </span>{" "}
          <span className="flex items-center">
            <span className="hidden lg:flex mr-2 text-sm text-[#141C1F]">
              End Date
            </span>{" "}
            <DatePicker
              renderExtraFooter={() => "extra footer"}
              showTime={{ format: "HH:mm" }}
              name="StartEndDate"
              format="DD/MM/YYYY HH:mm"
              style={{ padding: "16px" }}
              className="createDateRangePicker"
            />
          </span>{" "}
          <div className="mx-3">
            <Button
              title="Filter"
              className="rounded-lg px-10"
              size="sm"
              onClick={() =>
                setFilter({ fromDate: dates[0], toDate: dates[1] })
              }
            />
          </div>
        </div>
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
          }}
          style={{ marginTop: "20px" }}
        />
      </div>

      <Modal
        open={stateNewTask}
        onCancel={() => setStateNewTask(false)}
        footer={null}
        maskClosable={false}
      >
        {/* <Modal show={stateNewTask} closeModal={setStateNewTask}> */}
        <NewTask {...{ setStateNewTask }} />
      </Modal>

      <Modal
        open={stateNewStaff}
        onCancel={() => setStateNewStaff(false)}
        footer={null}
        maskClosable={false}
      >
        {/* <Modal show={stateNewStaff} closeModal={setStateNewStaff}> */}
        <NewStaff {...{ setStateNewStaff }} />
      </Modal>
    </div>
  );
};

export default History;
