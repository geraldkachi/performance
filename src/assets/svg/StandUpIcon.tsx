
import { SVGProps } from "react"
type Props = {
    index: boolean;
} & SVGProps<SVGSVGElement>;

const StandUpIcon = ({ index, ...props }: Props) => (
    <svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M15.25 6A3.25 3.25 0 0 1 12 9.25v1.5A4.75 4.75 0 0 0 16.75 6h-1.5ZM12 9.25A3.25 3.25 0 0 1 8.75 6h-1.5A4.75 4.75 0 0 0 12 10.75v-1.5ZM8.75 6A3.25 3.25 0 0 1 12 2.75v-1.5A4.75 4.75 0 0 0 7.25 6h1.5ZM12 2.75A3.25 3.25 0 0 1 15.25 6h1.5A4.75 4.75 0 0 0 12 1.25v1.5Zm-3 11h6v-1.5H9v1.5Zm6 6.5H9v1.5h6v-1.5Zm-6 0A3.25 3.25 0 0 1 5.75 17h-1.5A4.75 4.75 0 0 0 9 21.75v-1.5ZM18.25 17A3.25 3.25 0 0 1 15 20.25v1.5A4.75 4.75 0 0 0 19.75 17h-1.5ZM15 13.75A3.25 3.25 0 0 1 18.25 17h1.5A4.75 4.75 0 0 0 15 12.25v1.5Zm-6-1.5A4.75 4.75 0 0 0 4.25 17h1.5A3.25 3.25 0 0 1 9 13.75v-1.5Z"
            fill={index ? "#ffffff" : "#413E45"}
        />
    </svg>
)

export default StandUpIcon
