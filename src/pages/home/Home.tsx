import { Table, Modal } from "antd";
import { useState } from "react";
import { format } from "date-fns";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";

// import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import { getMetrics, getOverallPerformance } from "../../server/base/metrix";
import NewStaff from "../../components/otherComponents/NewStaff";
import NewTask from "../../components/otherComponents/NewTask";
import Metric from "../../components/otherComponents/Metric";
interface columnsProps {
  title: string
  width: string,
  align: string
  dataIndex: string,
}

const id = localStorage.getItem('standupId')

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [stateMetric, setStateMetric] = useState<boolean>(false);
  const [grabId, setGrabID] = useState<string>('');
  const [stateNewTask, setStateNewTask] = useState<boolean>(false)
  const [stateNewStaff, setStateNewStaff] = useState<boolean>(false)
  const { data, isLoading, isFetching } = useQuery(["getMetrics", page, limit], () => getMetrics(page, limit, id), { keepPreviousData: true })
  const { data: overall, isLoading: isLoadingOverall } = useQuery(["overall"], () => getOverallPerformance(), { keepPreviousData: true })

  console.log(overall, 'overall')

  const columns: columnsProps[] | any = [
    {
      title: 'Staff Name',
      render: (val: { staffName: string, id: string }) => (
        <span className="cursor-pointer" onClick={() => {
          setStateMetric(true)
          setGrabID(val?.id)
          console.log(val?.id)
        }}>{val?.staffName}</span>
      ),
      width: '10%',
      align: 'center',
    },
    {
      title: 'Review',
      render: (val: { review: string, id: string }) => (
        <span className="cursor-pointer" onClick={() => {
          setStateMetric(true)
          setGrabID(val?.id)
        }
        }>{val?.review}</span>
      ),
      width: '10%',
      align: 'center',
    },
    {
      title: 'Participation',
      dataIndex: 'participation',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Attended Meeting',
      dataIndex: 'attendedMeeting',
      render: (val: { attendedMeeting: boolean, id: string }) => (
        <span className="cursor-pointer" onClick={() => {
          setStateMetric(true)
          setGrabID(val?.id)
        }
        }>{val?.attendedMeeting === true ? 'True' : "False"}</span>
      ),
      width: '5%',
      align: 'center',
    },
    {
      title: 'Completed Meeting',
      dataIndex: 'completedMeeting',
      render: (val: { completedMeeting: boolean, id: string }) => (
        <span className="cursor-pointer" onClick={() => {
          setStateMetric(true)
          setGrabID(val?.id)
        }}>{val?.completedMeeting === true ? 'True' : "False"}</span>
      ),
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
    // }, // responsive: [
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

  ];

  // console.log(data, 'metrics all')

  const state = {

    options: {
      responsive: [{
        breakpoint: 1000,
        yaxis: {
          categories:  overall?.data.map(i => i.staffName),
        },
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
              endingShape: 'rounded',
              borderRadius: 5,
              // columnWidth: '100%'
            }
          }
        }
      }],

      plotOptions: {
        bar: {
          horizontal: false, //horizontal bar chart
          endingShape: 'rounded',
          borderRadius: 10,
          columnWidth: '50%'
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
        enabled: true,
        position: 'top',
        formatter: function (val: string) {
          return val;
        },
        horizontal: true,
        offsetX: 0,
        style: {
          fontSize: '10px',
          colors: ['#ffffff']
        }
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: overall?.data.map(i => i.staffName),
      },
    },
    series: [
      {
        name: "Performance Metrics Points/Scores",
        // data: [20, 30, 40, 20, 100, 60, 70, 54],
        data: overall?.data.map(i => i.percent),
      },
    ],
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onLimitChange = (limit: number) => {
    setLimit(limit);
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

      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
        height={'40%'}
      />


      <div onClick={() => setStateMetric(true)}>Add Metric </div>

      <div className="mt-10 mb-20  overflow-x-auto">
        <Table
          rowClassName={(_record, index) => (index % 2 !== 0 ? "stripe" : "")}
          size="small"
          rowKey={(record) => record?.id}
          loading={isLoading || isFetching}
          columns={columns}
          dataSource={data?.data}
          pagination={{
            position: ["bottomRight"],
            current: page,
            total: data?.data?.count,
            pageSize: limit,
            showSizeChanger: true,
            onShowSizeChange: onLimitChange,
            onChange: onPageChange,
          }}
          style={{ marginTop: '20px', padding: '20px', }}
        />
      </div>

      <Modal open={stateNewTask} onCancel={() => setStateNewTask(false)} footer={null} maskClosable={false}>
        {/* <Modal show={stateNewTask} closeModal={setStateNewTask}> */}
        <NewTask {...{ setStateNewTask }} />
      </Modal>

      <Modal open={stateNewStaff} onCancel={() => setStateNewStaff(false)} footer={null} maskClosable={false} closable={true} afterClose={() => setStateNewStaff(false)}>
        {/* <Modal show={stateNewStaff} closeModal={setStateNewStaff}> */}
        <NewStaff {...{ setStateNewStaff }} />
      </Modal>
      {/* <Modal open={stateMetric} onCancel={() => setStateMetric(false)} footer={null} maskClosable={false} closable={true} afterClose={() => setStateMetric(false)}>
        <Metric {...{ setStateMetric, grabId }} />
      </Modal> */}
    </div>
  )
}

export default Home
