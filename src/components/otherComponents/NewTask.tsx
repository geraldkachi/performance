import * as yup from "yup";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

import Input from "../input/Input";
import Button from "../button/Button";
import { getStaffs } from "../../server/base";
import { createTask } from "../../server/base/task";

interface Props {
  setStateNewTask: Dispatch<SetStateAction<boolean>>;
}
let schema = yup.object().shape({});

const rolesOption = [
  { label: "Not Started", value: "not-started" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Finished", value: "finished" },
];

const NewTask = ({ setStateNewTask }: Props) => {
  const queryClient = useQueryClient();
  const [staff, setStaff] = useState(null);
  const [page, _setPage] = useState<number>(1);
  const [state, setState] = useState<string>("");
  const [limit, _setLimit] = useState<number>(100);
  const formInput = useRef<HTMLInputElement>(null);
  const [dependants, setDependants] = useState<string[]>([]);

  const { data, isLoading } = useQuery(["getStaffs", limit, page], () =>
    getStaffs(limit, page)
  );

  const mutation = useMutation(createTask);

  const onFinish = (e: FormEvent) => {
    e.preventDefault();

    const values = {
      //@ts-ignore
      name: e.target["name"].value,
      staffId: staff,
      //@ts-ignore
      endDate: e.target["enddate"].value,
      //@ts-ignore
      startDate: e.target["startdate"].value,
      assignedBy: localStorage.getItem("staffId"),
      //@ts-ignore
      description: e.target["description"].value,
      dependants,
      status: state,
    };

    schema.validate(values).then((_val) => {
      mutation.mutate(values, {
        onSuccess: (_data) => {
          queryClient.invalidateQueries("taskApi");
          setStateNewTask((prev) => !prev);
          toast.success("Task Created Successfully");
        },
        onError: (e: unknown) => {
          if (e instanceof Error) {
            toast.error(e.message);
          }
        },
      });
    });
  };

  return (
    <div className="my-5 sm:my-0">
      <div className="flex items-center justify-between mb-10">
        <span className="font-bold text-xl sm:text-4xl">New Task</span>
      </div>
      <form onSubmit={onFinish}>
        <Input
          ref={formInput}
          label="Task Name"
          name="name"
          type="text"
          placeholder="Task Name"
        />
        <div className="mt-5">
          <div className="">
            <label className="my-1 text-black flex items-center text-left text-sm font-semibold mt-1">
              Staff
            </label>
          </div>
          <Select
            placeholder="Select Staff"
            style={{ width: "100%" }}
            size="large"
            loading={isLoading}
            value={staff}
            onSelect={(e) => {
              setStaff(e);
            }}
            options={
              data &&
              data?.data?.staff?.map(
                (val: { firstName: string; lastName: string; id: string }) => {
                  const temp = {
                    value: val?.id,
                    label: `${val?.firstName} ${val?.lastName}`,
                  };
                  return temp;
                }
              )
            }
          />
        </div>
        <div className="mt-5">
          <div className="">
            <label className="my-1 text-black flex items-center text-left text-sm font-semibold mt-1">
              Dependants
            </label>
          </div>
          <Select
            placeholder="Select Dependants"
            style={{ width: "100%" }}
            mode="multiple"
            size="large"
            allowClear
            loading={isLoading}
            value={dependants}
            onChange={(e) => {
              setDependants(e);
            }}
            options={
              data &&
              data?.data?.staff?.map(
                (val: { firstName: string; lastName: string; id: string }) => {
                  const temp = {
                    value: val?.id,
                    label: `${val?.firstName} ${val?.lastName}`,
                  };
                  return temp;
                }
              )
            }
          />
        </div>
        <Input
          ref={formInput}
          label="Start Date"
          name="startdate"
          type="date"
          placeholder="Position"
        />
        <Input
          ref={formInput}
          label="End Date"
          name="enddate"
          type="date"
          placeholder="Position"
        />
        <Input
          ref={formInput}
          label="Description"
          name="description"
          placeholder="Description"
          type="text"
        />
        <div className="mt-5">
          <div className="">
            <label className="my-1 text-black flex items-center text-left text-sm font-semibold mt-1">
              Status
            </label>
          </div>
          <Select
            placeholder="Select Status"
            style={{ width: "100%" }}
            size="large"
            onSelect={(e) => setState(e)}
            options={rolesOption}
            className="mb-3"
          />
        </div>

        <div className="flex items-center justify-center">
          <Button
            loading={mutation.isLoading}
            className="text-center rounded-lg mt-5"
            type="submit"
            title="Create Task"
          />
        </div>
      </form>
    </div>
  );
};

export default NewTask;
