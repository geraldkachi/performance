import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as yup from "yup";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState, } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import { createMetrics, getMetric, updateMetrics, } from "../../server/base/metrix";
let schema = yup.object().shape({});
const SelectCompletedMeeting = [
    { label: "Yes", value: true },
    { label: "No", value: false },
];
const SelectJoinedEarly = [
    { label: "Yes", value: true },
    { label: "No", value: false },
];
const SelectAttendedMeeting = [
    { label: "Yes", value: true },
    { label: "No", value: false },
];
const SelectCompletedTask = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Half-done", value: "half-done" },
];
const SelectPart = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Bad-Network", value: "bad-network" },
    { label: "No-Power", value: "no-power" },
    { label: "Permitted", value: "permitted" },
];
const SelectReview = [
    { label: "Good", value: "good" },
    { label: "Excellent", value: "excellent" },
    { label: "Fair", value: "fair" },
    { label: "Bad", value: "bad" },
];
const Metric = ({ setStateMetric, participantId }) => {
    const queryClient = useQueryClient();
    const { id: standupId } = useParams();
    const { data, isLoading: isLoadin } = useQuery(["getMetric", participantId], () => getMetric(standupId, participantId));
    const [attendedMeeting, setAttendedMeeting] = useState();
    const [completedMeeting, setCompletedMeeting] = useState();
    const [joinedEarly, setJoinedEarly] = useState();
    const [review, setReview] = useState();
    const [comment, setComment] = useState();
    const [participation, setParticipation] = useState();
    const [completedTask, setCompletedTask] = useState();
    const { mutate, isLoading } = useMutation(data?.data ? updateMetrics : createMetrics, {
        onSuccess: (res) => {
            toast.success(res?.message);
        },
        onError: (e) => {
            toast?.error(e?.message);
        },
    });
    useEffect(() => {
        setAttendedMeeting(data?.data ? data?.data?.attendedMeeting : null);
        setCompletedMeeting(data?.data ? data?.data?.completedMeeting : null);
        setParticipation(data?.data ? data?.data?.participation : null);
        setCompletedTask(data?.data ? data?.data?.completedTask : null);
        setReview(data?.data ? data?.data?.review : null);
        setComment(data?.data ? data?.data?.comment : null);
        setJoinedEarly(data?.data ? data?.data?.joinedEarly : null);
    }, [data?.data]);
    const onFinish = (e) => {
        e.preventDefault();
        let values = {
            standupId,
            staffId: participantId,
            ...(comment?.length && { comment }),
            joinedEarly,
            attendedMeeting,
            review,
            completedMeeting,
            participation,
            completedTask,
        };
        console.log(values, "values");
        schema.validate(values).then(() => {
            mutate({
                ...values,
                ...(data?.data && { id: data.data.id }),
            }, {
                onSuccess: (data) => {
                    toast.success(data?.message);
                    queryClient.invalidateQueries(`metric-${participantId}`);
                    setStateMetric((prev) => !prev);
                },
                onError: (e) => {
                    if (e instanceof Error) {
                        toast.error(e.message);
                    }
                },
            });
        });
    };
    return (_jsxs("div", { className: "my-5 sm:my-0", children: [_jsx("div", { className: "flex items-center justify-between mb-10", children: _jsx("span", { className: "font-bold text-xl sm:text-4xl", children: "Metric" }) }), _jsxs("form", { onSubmit: onFinish, children: [_jsxs("div", { children: [_jsx("div", { className: "", children: _jsx("label", { className: "text-black flex items-center text-left text-sm font-semibold", children: "CompletedMeeting" }) }), _jsx(Select, { placeholder: "Select CompletedMeeting", style: { width: "100%" }, size: "large", allowClear: true, 
                                // loading={ isLoading || isFetching}
                                onChange: (e) => setCompletedMeeting(e), value: completedMeeting, options: SelectCompletedMeeting, className: "mb-2 py-3" })] }), _jsxs("div", { children: [_jsx("div", { className: "", children: _jsx("label", { className: "text-black flex items-center text-left text-sm font-semibold", children: "AttendedMeeting" }) }), _jsx(Select, { placeholder: "Select attendedMeeting", style: { width: "100%" }, 
                                // mode="multiple"
                                size: "large", allowClear: true, 
                                // loading={ isLoading || isFetching}
                                onChange: (e) => setAttendedMeeting(e), value: attendedMeeting, options: SelectAttendedMeeting, className: "mb-2 py-3" })] }), _jsxs("div", { children: [_jsx("div", { className: "", children: _jsx("label", { className: "text-black flex items-center text-left text-sm font-semibold", children: "JoinedEarly" }) }), _jsx(Select, { placeholder: "Select joinedEarly", style: { width: "100%" }, 
                                // mode="multiple"
                                size: "large", allowClear: true, 
                                // loading={ isLoading || isFetching}
                                onChange: (e) => setJoinedEarly(e), value: joinedEarly, options: SelectJoinedEarly, className: "mb-2 py-3" })] }), _jsxs("div", { children: [_jsx("div", { className: "", children: _jsx("label", { className: "text-black flex items-center text-left text-sm font-semibold", children: "Participation" }) }), _jsx(Select, { placeholder: "Select Participation", style: { width: "100%" }, 
                                // mode="multiple"
                                size: "large", allowClear: true, 
                                // loading={ isLoading || isFetching}
                                onChange: (e) => setParticipation(e), value: participation, 
                                // value={positionParticipation}
                                options: SelectPart, className: "mb-2 py-3" })] }), _jsxs("div", { children: [_jsx("div", { className: "", children: _jsx("label", { className: "text-black flex items-center text-left text-sm font-semibold", children: "Review" }) }), _jsx(Select, { placeholder: "Select Review", style: { width: "100%" }, 
                                // mode="multiple"
                                size: "large", allowClear: true, 
                                // loading={ isLoading || isFetching}
                                onChange: (e) => setReview(e), value: review, options: SelectReview, className: "mb-2 py-3" })] }), _jsxs("div", { children: [_jsx("div", { className: "", children: _jsx("label", { className: "text-black flex items-center text-left text-sm font-semibold", children: "CompletedTask" }) }), _jsx(Select, { placeholder: "Select CompletedTask", style: { width: "100%" }, 
                                // mode="multiple"
                                size: "large", allowClear: true, 
                                // loading={ isLoading || isFetching}
                                onChange: (e) => setCompletedTask(e), value: completedTask, options: SelectCompletedTask, className: "mb-2 py-3" })] }), _jsx(Input, { label: "Comments", value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Comment", type: "text" }), _jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { loading: isLoading, className: "text-center rounded-lg mt-5", type: "submit", title: `${data?.data === null ? "Create Metric" : "Update Metric"}` }) })] })] }));
};
export default Metric;
