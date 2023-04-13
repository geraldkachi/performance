// import React, { ReactElement, MouseEvent, DetailedHTMLProps, InputHTMLAttributes } from "react"
// export interface IFormType {
//     input?: string
//     error?: string
// }

// export const initInput: IFormType = { input: "", error: "" }
// interface InputIconProps {
//     TrailingIcon?: () => JSX.Element
//     Loadingicon?: () => JSX.Element
// }
// interface Iprops {
//     type?: "text" | "email" | "password" | "date" | "radio" | "tel" | "number" | "search" | "file"
//     label?: string
//     value?: string
//     placeholder?: string
//     name?: string
//     children?: ReactElement
//     onChange?: Function
//     onBlur?: Function
//     onClick?: Function
//     onKeyDown?: Function
//     onKeyPress?: Function
//     required?: boolean
//     requiredMsg?: string
//     error?: string
//     disabled?: boolean
//     additionalInfo?: string
//     className?: string
//     autoCorrect?: boolean
//     full?: boolean
//     checked?: boolean
//     divStyle?: string
//     labelStyle?: string
//     minLength?: number
//     maxLength?: number
//     TrailingIcon?: () => JSX.Element
//     searchIcon?: boolean
// }
// const Input = ({
//     type = "text",
//     label = "",
//     value = "",
//     placeholder = "",
//     name = "name",
//     children,
//     onChange = () => { },
//     onBlur = () => { },
//     onClick = () => { },
//     onKeyPress = () => { },
//     onKeyDown = () => { },
//     required = true,
//     requiredMsg = "",
//     error = "",
//     disabled = false,
//     className = "",
//     checked = false,
//     divStyle = "",
//     labelStyle = "",
//     maxLength,
//     minLength,
//     TrailingIcon,
//     searchIcon
// }: Iprops & InputIconProps & DetailedHTMLProps<
// InputHTMLAttributes<HTMLInputElement>,
// HTMLInputElement
// >) => {

//     const input = (
//         <input
//             className={className}
//             type={type}
//             value={value}
//             placeholder={placeholder}
//             name={name}
//             required={required}
//             onChange={(e) => onChange(e)}
//             onBlur={(e) => onBlur(e)}
//             onClick={(e) => onClick(e)}
//             onKeyDown={(e) => onClick(e)}
//             onKeyPress={(e) => onClick(e)}
//             disabled={disabled}
//             checked={checked}
//             maxLength={maxLength}
//             minLength={minLength}
//         />
//     )

//     // return (
//     //     <fieldset className="w-full space-y-1">
//     //         {label && <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>}
//     //         <div className="relative">
//     //             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//     //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     //                     <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#02123B" strokeLinecap="round" strokeLinejoin="round" />
//     //                     <path d="M20.9999 20.9999L16.6499 16.6499" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
//     //                 </svg>
//     //             </div>
//     //             <input type="search" id="default-search" className="w-full lg:w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500" {...{ placeholder }} required />
//     //         </div>
//     //     </fieldset>
//     // )

//     return (
//         <div className={`form-input space-y-1 ${divStyle} ` + (error && "error")}>
//             {label &&
//                 <div className="flex items-center justify-between">

//                     <label htmlFor={name} className={`block font-semibold text-sm text-[#000000]  ${labelStyle}`}>
//                         {" "}{" "}
//                         {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
//                         {label}
//                         <p className="text-[#EB0000] inline">{`${requiredMsg}`}</p>
//                     </label>

//                     {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g clipPath="url(#clip0_1367_204)">
//                             <path d="M8.00004 14.6666C11.6819 14.6666 14.6667 11.6819 14.6667 7.99998C14.6667 4.31808 11.6819 1.33331 8.00004 1.33331C4.31814 1.33331 1.33337 4.31808 1.33337 7.99998C1.33337 11.6819 4.31814 14.6666 8.00004 14.6666Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M6.06006 6.00001C6.21679 5.55446 6.52616 5.17875 6.93336 4.93944C7.34056 4.70012 7.81932 4.61264 8.28484 4.69249C8.75036 4.77234 9.1726 5.01436 9.47678 5.3757C9.78095 5.73703 9.94743 6.19436 9.94673 6.66668C9.94673 8.00001 7.94673 8.66668 7.94673 8.66668" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M8 11.3333H8.00667" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" />
//                         </g>
//                         <defs>
//                             <clipPath id="clip0_1367_204">
//                                 <rect width="16" height="16" fill="white" />
//                             </clipPath>
//                         </defs>
//                     </svg> */}


//                 </div>
//             }
//             <div className="relative disabled:bg-gray-50">
//                 {searchIcon &&
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#02123B" strokeLinecap="round" strokeLinejoin="round" />
//                             <path d="M20.9999 20.9999L16.6499 16.6499" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </div>
//                 }
//                 {input}
//                 {TrailingIcon && (
//                     <span className="absolute inset-y-0 right-0 flex items-center pr-5 cursor-pointer">
//                         <TrailingIcon />
//                     </span>
//                 )}
//             </div>
//             <span>{error}</span>
//         </div>
//     )
// }

// export default Input


// import { UseFormRegisterReturn } from 'react-hook-form';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = {
	label?: string;
	tooltip?: string;
	helptext?: string;
	inputClassName?: string;
	LeadingIcon?: () => JSX.Element;
	TrailingIcon?: () => JSX.Element;
	innerRef?: any;
	inputType?: 'default' | 'success' | 'warning' | 'error';
};

export default function Input(
	props: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> &
		Props
) {
	const {
		id,
		label,
		tooltip,
		disabled,
		readOnly,
		helptext,
		innerRef,
		className,
		LeadingIcon,
		TrailingIcon,
		inputClassName,
		inputType = 'default'
	} = props;

	const col = () => {
		let color = 'grey-beau';

		if (inputType === 'success') {
			color = 'meador';
		} else if (inputType === 'warning') {
			color = 'yellow';
		} else if (inputType === 'error') {
			color = 'orange';
		}

		return color;
	};

	return (
		<div className={`bg- ${className}`}>
			{label && (
				<label
					className="my-1 text-black flex items-center text-left text-sm font-semibold mt-5"
					htmlFor={id}
				>
					{label}
					{tooltip && (
						<>
							{/* <Icon
								icon="info-circle"
								{...labelIconProps}
								className={`inline-block ml-2 ${labelIconProps?.className}`}
							/> */}
						</>
					)}
				</label>
			)}
			<div
                className={`bg-white flex items-center w-full rounded-lg overflow-hidden border focus-within:border-bluetiful disabled:bg-grey read-only:bg-grey ${inputClassName}
                border-${col()}
                ${
					(disabled || readOnly) && 'bg-grey border-none'
				}`}
			>
				{LeadingIcon && (
					<span className="mx-2">
						<LeadingIcon />
					</span>
				)}
				<input
					{...innerRef}
					{...props}
					// className={`text-base p-2 flex-grow min-w-64 focus:outline-none focus:ring focus:border-blue-100`}
                    className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]"
				/>
				{TrailingIcon && (
					<span className="mx-2">
						<TrailingIcon />
					</span>
				)}
			</div>
			{helptext && (
				<small className={`text-xs my-2 text-${col()}`}>{helptext}</small>
			)}
		</div>
	);
}

