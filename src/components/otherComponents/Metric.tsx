import * as yup from "yup";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import Button from '../button/Button'
import Input from '../input/Input'
import { createMetrics, getMetric, updateMetrics } from "../../server/base/metrix"
import { toast } from "react-toastify"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom";
import { Select } from "antd"
interface Props {
  setStateMetric: Dispatch<SetStateAction<boolean>>
  participantId: string
}
let schema = yup.object().shape({});

const SelectCompletedMeeting = [
  { label: "Yes", value: true },
  { label: "No", value: false },
]
const SelectJoinedEarly = [
  { label: "Yes", value: true },
  { label: "No", value: false },
]
const SelectAttendedMeeting = [
  { label: "Yes", value: true },
  { label: "No", value: false },
]

const SelectCompletedTask = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Half-done", value: "half-done" },
]
const SelectPart = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Bad-Network", value: "bad-network" },
  { label: "No-Power", value: "no-power" },
  { label: "Permitted", value: "permitted" },
]

const SelectReview = [
  { label: "Good", value: "good" },
  { label: "Excellent", value: "excellent" },
  { label: "Fair", value: "fair" },
  { label: "Bad", value: "bad" },
];

const Metric = ({ setStateMetric, participantId }: Props) => {
  const { id: standupId } = useParams()
  const { data, isLoading: isLoadin } = useQuery(["getMetric", participantId], () => getMetric(standupId as string, participantId))


  console.log(data, 'standupId dat')
  const [state, setState] = useState<string>('')

  const [attendedMeeting, setAttendedMeeting] = useState()
  const [completedMeeting, setCompletedMeeting] = useState<boolean | null>()
  const [joinedEarly, setJoinedEarly] = useState<boolean | null>()

  const [review, setReview] = useState()
  const [comment, setComment] = useState<string>()
  const [participation, setParticipation] = useState<string>()
  const [completedTask, setCompletedTask] = useState()

  const { mutate, isLoading } = useMutation((data?.data ? updateMetrics : createMetrics ), {
    onSuccess: (res) => {
      toast.success(res?.message);
    },
    onError: (e: Error) => {
      toast?.error(e?.message);
    },
  })

  useEffect(() => {
    setAttendedMeeting(data?.data ? data?.data?.attendedMeeting : null);
    setCompletedMeeting(data?.data ? data?.data?.completedMeeting : null);
    setParticipation(data?.data ? data?.data?.participation : null);
    setCompletedTask(data?.data ? data?.data?.completedTask : null);
    setReview(data?.data ? data?.data?.review : null);
    setComment(data?.data ? data?.data?.comment : null);
    setJoinedEarly(data?.data ? data?.data?.joinedEarly : null);

  }, [data?.data])


  const onFinish = (e: FormEvent) => {
    e.preventDefault()

    let values = {
      standupId,
      staffId: participantId,
      comment,
      joinedEarly,  //boolean
      attendedMeeting, //boolean
      review, // fair
      completedMeeting, // boolean
      participation,  //inacctive
      completedTask,
    }

    console.log(values, 'values')

    schema
      .validate(values)
      .then(() => {
        mutate({...values, ...(comment.length && {comment}), ...(data?.data && {id:data.data.id})}, {
          onSuccess: (data) => {
            // console.log(data?.data, 'Metric Updated successfully');
            toast.success(data?.message)
            setStateMetric(prev => !prev)
          },
          onError: (e: unknown) => {
            if (e instanceof Error) {
              toast.error(e.message)
            }
          }
        });
      })
  }


  return (
    <div className="my-5 sm:my-0">
      <div className="flex items-center justify-between mb-10">
        <span className="font-bold text-xl sm:text-4xl">Metric</span>

        {/* <svg onClick={() => {}} className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_10206_90642)">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#668A99" />
        </g>
        <defs>
          <clipPath id="clip0_10206_90642">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg> */}


      </div>
      <form onSubmit={onFinish}>
        {/* <Input label='Joins Early' value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Task Name" /> */}
        {/* <Input label='Present in Meeting' value={email} onChange={e => setEmail(e.target.value)} placeholder='Dependant' type="text" /> */}
        {/* <Input label='Participation' value={position} onChange={e => setPosition(e.target.value)} type="date" placeholder="Position" /> */}

        <div>
          <div className="">
            <label className="text-black flex items-center text-left text-sm font-semibold">CompletedMeeting</label>
          </div>
          <Select
            placeholder="Select CompletedMeeting"
            style={{ width: "100%" }}
            // mode="multiple"
            size="large"
            allowClear
            // loading={ isLoading || isFetching}
            onChange={(e) => setCompletedMeeting(e)}
            value={completedMeeting}
            options={SelectCompletedMeeting}
            className="mb-2 py-3"
          />
        </div>
        <div>
          <div className="">
            <label className="text-black flex items-center text-left text-sm font-semibold">AttendedMeeting</label>
          </div>
          <Select
            placeholder="Select attendedMeeting"
            style={{ width: "100%" }}
            // mode="multiple"
            size="large"
            allowClear
            // loading={ isLoading || isFetching}
            onChange={(e) => setAttendedMeeting(e)}
            value={attendedMeeting}
            options={SelectAttendedMeeting}
            className="mb-2 py-3"
          />
        </div>
        <div>
          <div className="">
            <label className="text-black flex items-center text-left text-sm font-semibold">JoinedEarly</label>
          </div>
          <Select
            placeholder="Select joinedEarly"
            style={{ width: "100%" }}
            // mode="multiple"
            size="large"
            allowClear
            // loading={ isLoading || isFetching}
            onChange={(e) => setJoinedEarly(e)}
            value={joinedEarly}
            options={SelectJoinedEarly}
            className="mb-2 py-3"
          />
        </div>

        <div>
          <div className="">
            <label className="text-black flex items-center text-left text-sm font-semibold">Participation</label>
          </div>
          <Select
            placeholder="Select Participation"
            style={{ width: "100%" }}
            // mode="multiple"
            size="large"
            allowClear
            // loading={ isLoading || isFetching}
            onChange={(e) => setParticipation(e)}
            value={participation}
            // value={positionParticipation}
            options={SelectPart}
            className="mb-2 py-3"
          />
        </div>

        <div>
          <div className="">
            <label className="text-black flex items-center text-left text-sm font-semibold">Review</label>
          </div>
          <Select
            placeholder="Select Review"
            style={{ width: "100%" }}
            // mode="multiple"
            size="large"
            allowClear
            // loading={ isLoading || isFetching}
            onChange={(e) => setReview(e)}
            value={review}
            options={SelectReview}
            className="mb-2 py-3"
          />
        </div>
        <div>
          <div className="">
            <label className="text-black flex items-center text-left text-sm font-semibold">CompletedTask</label>
          </div>
          <Select
            placeholder="Select CompletedTask"
            style={{ width: "100%" }}
            // mode="multiple"
            size="large"
            allowClear
            // loading={ isLoading || isFetching}
            onChange={(e) => setCompletedTask(e)}
            value={completedTask}
            options={SelectCompletedTask}
            className="mb-2 py-3"
          />
        </div>
        {/* <div>
          <div className="">
            <label className="text-black flex items-center text-left text-sm font-semibold">Review</label>
          </div>
          <Select
            placeholder="Select Review"
            style={{ width: "100%" }}
            // mode="multiple"
            size="large"
            allowClear
            // loading={ isLoading || isFetching}
            onChange={(e) => setReview(e)}
            value={ review}
            options={SelectReview}
            className="mb-2 py-3"
          />
        </div> */}
        <Input label='Comments' value={comment} onChange={e => setComment(e.target.value)} placeholder='Comment' type="text" />
        {/* <Input label='Review' value={review} onChange={e => setReview(e.target.value)} placeholder='Review' type="text" /> */}
        {/* <Input label='Participation' value={participation} onChange={e => setParticipation(e.target.value)} type="text" placeholder="participation" /> */}

        <div className="flex items-center justify-center">
          <Button loading={isLoading} className="text-center rounded-lg mt-5" type="submit" title={`${data?.data === null ? 'Create Metric' : 'Update Metric'}`} />
        </div>
      </form>
    </div>
  )
}

export default Metric
// https://web.facebook.com/reel/1090510225201264/?s=ifu
