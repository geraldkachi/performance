import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import Button from '../button/Button'
import Input from '../input/Input'
interface Props {
    setStateMetric?: Dispatch<SetStateAction<boolean>>
  }
const Metric = ({}: Props) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [position, setPosition] = useState<string>('')

    const onFinish = (e: FormEvent) => {
      e.preventDefault()
    }

  return (
    <div className="my-5 sm:my-0">
    <div className="flex items-center justify-between mb-10">
      <span className="font-bold text-xl sm:text-4xl">Metric</span>

      <svg onClick={() => {}} className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <Input label='Joins Early' value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Task Name" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />
      <Input label='Present in Meeting' value={email} onChange={e => setEmail(e.target.value)} placeholder='Dependant' type="text" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />
      <Input label='Participation' value={position} onChange={e => setPosition(e.target.value)} type="date" placeholder="Position" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />
      <Input label='Attendance' value={position} onChange={e => setPosition(e.target.value)} type="date" placeholder="Position" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />
      <Input label='Task' value={email} onChange={e => setEmail(e.target.value)} placeholder='Description' type="text" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />
      <Input label='Comments' value={email} onChange={e => setEmail(e.target.value)} placeholder='Description' type="text" className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />


      <div className="flex items-center justify-center">
        <Button className="text-center rounded-lg mt-5" type="submit" title="Update" onClick={() => {}} />
      </div>
    </form>
  </div>
  )
}

export default Metric
