import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import Button from '../button/Button'
import Input from '../input/Input'

interface Props {
    setStateNewTask: Dispatch<SetStateAction<boolean>>
  }
const NewTask = ({ setStateNewTask }: Props) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [position, setPosition] = useState<string>('')

    const onFinish = (e: FormEvent) => {
      e.preventDefault()
    }
  return (
    <div className="my-5 sm:my-0">
    <div className="flex items-center justify-between mb-10">
      <span className="font-bold text-xl sm:text-4xl">New Task</span>

      <svg onClick={() => setStateNewTask(false)} className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <Input label='Task Name' value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Task Name"  />
      <Input label='Dependant' value={email} onChange={e => setEmail(e.target.value)} placeholder='Dependant' type="text"  />
      <Input label='Start Date' value={position} onChange={e => setPosition(e.target.value)} type="date" placeholder="Position"  />
      <Input label='End Date' value={position} onChange={e => setPosition(e.target.value)} type="date" placeholder="Position"  />
      <Input label='Description' value={email} onChange={e => setEmail(e.target.value)} placeholder='Description' type="text"  />


      <div className="flex items-center justify-center">
        <Button className="text-center rounded-lg mt-5" type="submit" title="Create Task" onClick={() => setStateNewTask(false)} />
      </div>
    </form>
  </div>
  )
}

export default NewTask
