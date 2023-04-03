import * as React from "react"
import { SVGProps } from "react"

const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={39} height={39} rx={19.5} fill="#fff" />
    <path
      d="M20 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20 22.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"
      fill="#141C1F"
    />
    <rect x={0.5} y={0.5} width={39} height={39} rx={19.5} stroke="#141C1F" />
  </svg>
)

export default ProfileIcon
