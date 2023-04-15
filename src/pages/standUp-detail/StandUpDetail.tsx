import * as yup from "yup";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Button } from "../../components";
import Input from "../../components/input/Input";
import { createStandUp } from "../../server/base/standup";
import { toast } from "react-toastify";
import { getStaffs } from "../../server/base";
import { Select } from "antd";

let schema = yup.object().shape({});

const StandUpDetail = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(null);
  const [role, setRole] = useState<string>("");
  const formInput = useRef<HTMLInputElement>(null)

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);


  const mutation = useMutation(createStandUp)
  const { data, isLoading, isFetching } = useQuery(["getStaffs", limit, page], () => getStaffs(limit, page), { keepPreviousData: true })
  console.log(data?.data?.staff, 'getStaffs')
  console.log(state, 'getStaffs state')


  const onFinish = (e: FormEvent) => {
    e.preventDefault()

    let values = {
      title: e.target["title"].value,
      participants: [state],
    }

    console.log(values, 'values')

    schema
      .validate(values)
      .then((_val) => {
        mutation.mutate(values, {
          onSuccess: (data) => {
            toast.success(data?.message)
            values = {title: '', participants: []}
          },
          onError: (e: unknown) => {
            if (e instanceof Error) {
              toast.error(e.message)
            }
          }
        });
      })
  }

  const rolesOption = [
    { label: "Admin", value: "admin" },
    { label: "Sub Admin", value: "sub-admin" },
    { label: "Super Admin", value: "super-admin" },
  ];

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-right">{format(new Date(), "dd MMMM yyyy, hh:mm a")}</div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className=" text-3xl bg-[##141C1F] mt-20 sm:text-4xl">Start Meeting</p>

      </div>

      <div className="grid sm:grid-cols-2 mb-20">
        <form onSubmit={onFinish}>
          <Input ref={formInput} label='Title' name='title' type="text" placeholder="Enter meeting title" />
          {/* <Input ref={formInput} label='12:15AM' name='date' placeholder='12:15AM' type="date" /> */}
          {/* <Input ref={formInput} label='Participation' name="participants" type="text" placeholder="Select staff " /> */}
          <div className="mt-5">
            <div className="">
              <label className="my-1 text-black flex items-center text-left text-sm font-semibold mt-1">Participation</label>
            </div>
            <Select
              placeholder="Select Participation"
              style={{ width: "100%" }}
              size="large"
              loading={ isLoading || isFetching}
              value={state}
              onSelect={(e) => setState(e)}
              options={data &&
                data?.data?.staff?.map((val) => {
                  const temp = {
                    value: val?.id,
                    label: `${val?.firstName} ${val?.lastName}`,
                  };
                  return temp;
                })}
              className="mb-3 py-3"
            />
            {/* <Select
              style={{ width: "100%" }}
              size="large"
              value={state} onChange={value => setState(value)}>
              {data?.data?.staff?.map((option: any) => (
                <Select.Option key={option?.id} value={option?.id}>{`${option?.firstName} ${option?.lastName}`}</Select.Option>
              ))}
            </Select> */}
          </div>

          <div className="flex items-center">
            <Button loading={mutation.isLoading} className="text-center rounded-lg mt-10" type="submit" title="Start meeting" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default StandUpDetail
