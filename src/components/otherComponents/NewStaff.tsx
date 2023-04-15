import * as yup from "yup";
import { toast } from "react-toastify"
import { useMutation } from "react-query"
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react"

import Input from "../input/Input"
import Button from "../button/Button"
import { createStaff } from "../../server/base"
import { CreateStaffType } from "../../../types"
import { Select } from "antd";


export const rolesOption = [
  { label: "Admin", value: "admin" },
  { label: "Sub Admin", value: "sub-admin" },
  { label: "Super Admin", value: "super-admin" },
];

const firstName = localStorage.getItem('firstName') as string
const lastName = localStorage.getItem('lastName') as string
const role = localStorage.getItem('role')
interface Props {
  setStateNewStaff: Dispatch<SetStateAction<boolean>>
}
let schema = yup.object().shape({
  email: yup.string(),
  password: yup.string().required("Enter a valid password").min(6).nullable(),
});
const NewStaff = ({ setStateNewStaff }: Props) => {
  const formInput = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<string>('')



  const mutation = useMutation(createStaff)

  const onFinish = (e: FormEvent) => {
    e.preventDefault()

    const values: CreateStaffType = {
      password: e.target["password"].value,
      firstName,
      lastName,
      email: e.target["email"].value,
      role: state,
      // role: e.target["role"].value,
      phoneNumber: (e.target["phone"].value).replace(/ /g, ''),
    };

    schema
      .validate(values)
      .then((_val) => {
        mutation.mutate(values, {
          onSuccess: (data) => {
            setStateNewStaff(prev => !prev)
            toast.success('Staff Created Successfully')
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
        <span className="font-bold text-xl sm:text-4xl">New Staff</span>

        <svg onClick={() => setStateNewStaff(false)} className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <Input label='Name' name='name' ref={formInput} type="text" placeholder="Name" />
        <Input label='Email Address' ref={formInput} name='email' placeholder='Email Address' type="email"
        // className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5"
        />
        {/* <Input label='Position' ref={formInput} name='role' type="text" placeholder="Position" /> */}
        <div className="mt-5">
            <div className="">
              <label className="my-1 text-black flex items-center text-left text-sm font-semibold mt-1">Status</label>
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
        <Input label='Password' ref={formInput} name='password' type="password" placeholder="Password" />

        <Input label='phone' ref={formInput} name='phone' type="tel" placeholder="Phone Number" />


        <div className="flex items-center justify-center">
          <Button className="text-center rounded-lg mt-5 w-full" loading={mutation.isLoading} type="submit" title="Add New Staff"
            // onClick={() => setStateNewStaff(false)}
          />
        </div>
      </form>
    </div>
  )
}

export default NewStaff
