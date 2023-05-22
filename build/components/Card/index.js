import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spin, Tag } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMetric } from "../../server/base/metrix";
const Card = ({ participantId, staff, width = "full", }) => {
    const { id: standupId } = useParams();
    const { data, isLoading } = useQuery(`metric-${participantId}`, () => getMetric(standupId, participantId), {
        enabled: !!standupId && !!participantId,
    });
    const swapper = (val) => (val ? "Yes" : "No");
    return (_jsx("div", { className: `rounded-lg bg-white shadow-md p-8 w-[${width}] h-auto`, children: isLoading ? (_jsx(Spin, {})) : (_jsxs("div", { className: "grid gap-4", children: [_jsx("div", { className: " text-green-500", children: staff?.name }), data?.data ? (_jsxs("div", { className: "flex flex-col gap-y-5 lg:flex-row lg:justify-between lg:gap-x-3", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx("p", { className: "text-[#1C1C1D] font-semibold", children: "Joined Early" }), _jsx("p", { children: _jsx(Tag, { color: data?.data.JoinedEarly ? "green" : "red", children: swapper(data?.data.JoinedEarly) }) })] }), _jsxs("div", { className: "grid", children: [_jsx("p", { className: "text-[#1C1C1D] font-semibold", children: "Attended Meeting" }), _jsx("p", { className: "capitalize", children: _jsx(Tag, { color: data?.data.attendedMeeting ? "green" : "red", children: swapper(data?.data.attendedMeeting) }) })] }), _jsxs("div", { className: "grid", children: [_jsx("p", { className: "text-[#1C1C1D] font-semibold", children: "Completed Meeting" }), _jsx("p", { className: "capitalize", children: _jsx(Tag, { color: data?.data.completedMeeting ? "green" : "red", children: swapper(data?.data.completedMeeting) }) })] }), _jsxs("div", { className: "grid", children: [_jsx("p", { className: "text-[#1C1C1D] font-semibold", children: "Completed Task" }), _jsx("p", { className: "capitalize", children: _jsx(Tag, { color: data?.data?.completedTask === "yes" ? "green" : "default", children: data?.data.completedTask || "Nil" }) })] }), _jsxs("div", { className: "grid", children: [_jsx("p", { className: "text-[#1C1C1D] font-semibold", children: "Review" }), _jsxs("p", { className: "capitalize", children: [_jsx(Tag, { color: data?.data?.review === "excellent" ? "green" : "default", children: data?.data.review }), " "] })] }), _jsxs("div", { className: "grid", children: [_jsx("p", { className: "text-[#1C1C1D] font-semibold", children: "Participation" }), _jsxs("p", { className: "capitalize", children: [_jsx(Tag, { color: data?.data?.participation === "active"
                                                ? "green"
                                                : "default", children: data?.data.participation }), " "] })] }), _jsxs("div", { className: "grid", children: [_jsx("p", { className: "text-[#1C1C1D] font-semibold", children: "Total Remark" }), _jsxs("p", { className: "capitalize", children: [_jsxs(Tag, { color: data?.data?.totalRemark > 70
                                                ? "green"
                                                : data?.data?.totalRemark > 45
                                                    ? "orange"
                                                    : "red", children: [data?.data.totalRemark || 0, " %"] }), " "] })] })] })) : (_jsx("div", { className: "grid place-items-center", children: "No metric added!" }))] })) }));
};
export default Card;
