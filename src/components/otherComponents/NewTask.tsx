import * as yup from "yup";
import { toast } from "react-toastify"
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react"

import Input from '../input/Input'
import Button from '../button/Button'
import { useMutation } from "react-query";
import { createTask } from "../../server/base/task";



interface Props {
  setStateNewTask: Dispatch<SetStateAction<boolean>>
}
let schema = yup.object().shape({
  email: yup.string(),
  password: yup.string().required("Enter a valid password").min(6).nullable(),
});
const NewTask = ({ setStateNewTask }: Props) => {
  const formInput = useRef<HTMLInputElement>(null)

const mutation = useMutation(createTask)

  const onFinish = (e: FormEvent) => {
    e.preventDefault()

    const values = {
      name: e.target["name"].value,
      staffId: "",
      endDate: e.target["enddate"].value,
      startDate: e.target["startdate"].value,
      assignedBy: "",
      description: e.target["description"].value,
      dependants: [],
      status: e.target["status"].value,
    }

    schema
      .validate(values)
      .then((_val) => {
        mutation.mutate(values, {
          onSuccess: (data) => {
            setStateNewTask(prev => !prev)
            toast.success('Task Created Successfully')
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
        <span className="font-bold text-xl sm:text-4xl">New Task</span>

        <svg onClick={() => setStateNewTask(prev => !prev)} className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_10206_90642)">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#668A99" />
          </g>
          <defs>
            <clipPath id="clip0_10206_90642">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>


      </div>
      <form onSubmit={onFinish}>
        <Input ref={formInput} label='Task Name' name='name' type="text" placeholder="Task Name" />
        <Input ref={formInput} label='Dependant' name="dependant" placeholder='Dependant' type="text" />
        <Input ref={formInput} label='Start Date' name="startdate" type="date" placeholder="Position" />
        <Input ref={formInput} label='End Date' name="enddate" type="date" placeholder="Position" />
        <Input ref={formInput} label='Description' name='description' placeholder='Description' type="text" />


        <div className="flex items-center justify-center">
          <Button className="text-center rounded-lg mt-5" type="submit" title="Create Task" />
        </div>
      </form>
    </div>
  )
}

export default NewTask
