import { FormEvent, useRef, useState } from "react"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components"
import Input from "../../components/input/Input"
import PasswordMe from "../../components/otherComponents/PasswordMe"

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const formInput = useRef<HTMLInputElement>(null)
    const mutation = useMutation('custmerLogin', {})
    const onFinish = (e: FormEvent) => {
        e.preventDefault()
        navigate('/home')

        const values = {
            phoneNumber: e.target["email"].value,
            password: e.target["password"].value,
        };
    }

    const handleChange = () => { }
    return (
        <div className="h-screen my-auto">

            <div className=" absolute scale- top-[98px] left[-40px]" >
                <svg width="200" height="200" viewBox="-100 -100 200 200" className='md:scale-110 my-1'>
                    <polygon points="0,0 80,120 -80,120" fill="#234236" />
                    <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
                    <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
                    <rect x="-20" y="120" width="40" height="30" fill="brown" />
                </svg>
                <img src="" alt="" />
            </div>
            <div className='pt-36 bg-gradien flex items-center justify-center my-auto'>

                <div className='text-center logoLogin flex flex-col justify-center items-center absolute top-[13%] md:top-[12%]'>
                    <svg width="200" height="200" viewBox="-100 -100 200 200" className='md:scale-110 my-1'>
                        <polygon points="0,0 80,120 -80,120" fill="#234236" />
                        <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
                        <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
                        <rect x="-20" y="120" width="40" height="30" fill="brown" />
                    </svg>
                    <div className='flex items-center gap-5 text-3xl mb-10'>
                        {/* <CompanyLogo className='md:scale-110 my-1' /> <h1 className='font-bold text-lg md:text-[30px]'>Skippy</h1> */}
                        Perfomance Metrix
                    </div>
                </div>

                <div className="login z-10 p-5 rounded-lg w-full max-w-[23rem]  md:bg-white bg-transparent">

                    <div className='p-[10px]'>
                        <span className='text-[#949AB1] text-sm'>Welcome Back,</span>
                        <h1 className='font-bold'>Admin</h1>
                    </div>

                    <form className='' action="" onSubmit={onFinish}>

                        <Input label="Email"
                            ref={formInput}
                            type="email" name="email" placeholder='Email' onChange={handleChange} className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5" />


                        <Input label="Password" type="password" name='password' placeholder='Password' onChange={handleChange} className="w-full border border-[#C2D0D6] p-3 rounded-lg focus:outline-[#2B8572]" divStyle="mt-5"
                            TrailingIcon={() => (
                                <PasswordMe
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                />
                            )}
                        />

                        <div className='mb-3 userInput'>
                            <Link to="/reset" className="text-[#FF5A5A] font-bold text-sm">Reset Passsword</Link>
                        </div>

                        <div className="flex items-center mt-10">
                            <Button className='w-full text-center' title="Sign In" type='submit' onClick={() => navigate('/')} />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login
