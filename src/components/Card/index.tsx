import { Spin, Tag } from "antd";
import { ReactElement } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMetric } from "../../server/base/metrix";
import { boolFormatter } from "../../utils/helper";

type Props = {
  staff: { name: string; role: string };
  width?: string;
  participantId: string;
};

const Card = ({
  participantId,
  staff,
  width = "full",
}: Props): ReactElement => {
  const { id: standupId } = useParams();
  const { data, isLoading } = useQuery(
    `metric-${participantId}`,
    () => getMetric(standupId as string, participantId),
    {
      enabled: !!standupId && !!participantId,
    }
  );

  return (
    <div className={`rounded-lg bg-white shadow-md p-8 w-[${width}] h-auto`}>
      {isLoading ? (
        <Spin />
      ) : (
        <div className="grid gap-4">
          <div className=" text-green-500">{staff?.name}</div>
          {data?.data ? (
            <div className="flex flex-col gap-y-5 lg:flex-row lg:justify-between lg:gap-x-3">
              <div className="grid gap-2">
                <p className="text-[#1C1C1D] font-semibold">Joined Early</p>
                <p>
                  <Tag color={data?.data.JoinedEarly ? "green" : "red"}>
                    {boolFormatter(data?.data.JoinedEarly)}
                  </Tag>
                </p>
              </div>
              <div className="grid">
                <p className="text-[#1C1C1D] font-semibold">Attended Meeting</p>
                <p className="capitalize">
                  <Tag color={data?.data.attendedMeeting ? "green" : "red"}>
                    {boolFormatter(data?.data.attendedMeeting)}
                  </Tag>
                </p>
              </div>
              <div className="grid">
                <p className="text-[#1C1C1D] font-semibold">
                  Completed Meeting
                </p>
                <p className="capitalize">
                  <Tag color={data?.data.completedMeeting ? "green" : "red"}>
                    {boolFormatter(data?.data.completedMeeting)}
                  </Tag>
                </p>
              </div>
              <div className="grid">
                <p className="text-[#1C1C1D] font-semibold">Completed Task</p>
                <p className="capitalize">
                  <Tag
                    color={
                      data?.data?.completedTask === "yes" ? "green" : "default"
                    }
                  >
                    {data?.data.completedTask || "Nil"}
                  </Tag>
                </p>
              </div>
              <div className="grid">
                <p className="text-[#1C1C1D] font-semibold">Review</p>
                <p className="capitalize">
                  <Tag
                    color={
                      data?.data?.review === "excellent" ? "green" : "default"
                    }
                  >
                    {data?.data.review}
                  </Tag>{" "}
                </p>
              </div>
              <div className="grid">
                <p className="text-[#1C1C1D] font-semibold">Participation</p>
                <p className="capitalize">
                  <Tag
                    color={
                      data?.data?.participation === "active"
                        ? "green"
                        : "default"
                    }
                  >
                    {data?.data.participation}
                  </Tag>{" "}
                </p>
              </div>
              <div className="grid">
                <p className="text-[#1C1C1D] font-semibold">Total Remark</p>
                <p className="capitalize">
                  <Tag
                    color={
                      data?.data?.totalRemark > 70
                        ? "green"
                        : data?.data?.totalRemark > 45
                        ? "orange"
                        : "red"
                    }
                  >
                    {data?.data.totalRemark || 0} %
                  </Tag>{" "}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid place-items-center">No metric added!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
