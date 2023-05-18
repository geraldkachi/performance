import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { Button } from "../../components";
import Input from "../../components/input/Input";
import { login, verifyOtp } from "../../server/base";

let schema = yup.object().shape({
  email: yup.string(),
  password: yup.string().required("Enter a valid password").min(6).nullable(),
});

let otpSchema = yup.object().shape({
  otp: yup.string().required().max(6),
});

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const otpRef = useRef<HTMLInputElement>(null);
  const formInput = useRef<HTMLInputElement>(null);
  const [isOtp, setIsOtp] = useState<boolean>(false);

  const mutation = useMutation(login, {
    onSuccess: (res) => {
      setId(res?.data?.id);
      setIsOtp(true);
    },
    onError: (e: Error) => {
      toast.error(e?.message || "Error siging in!");
    },
  });

  const { mutate: verifyOtpMutation, isLoading: otpLoading } = useMutation(
    verifyOtp,
    {
      onSuccess: (res) => {
        toast.success("Login successful");
        localStorage.setItem("role", JSON.stringify(res?.data?.staff?.role));
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("firstName", res?.data?.staff?.firstName);
        localStorage.setItem("lastName", res?.data?.staff?.lastName);
        localStorage.setItem("staffId", res?.data?.staff?.id);
        navigate("/home");
      },
      onError: (e: Error) => {
        toast.error(e?.message || "Error verifying OTP");
      },
    }
  );

  const onFinish = (e: FormEvent) => {
    e.preventDefault();

    const values = {
      //@ts-ignore
      email: e.target["email"].value,
      //@ts-ignore
      password: e.target["password"].value,
    };

    schema
      .validate(values)
      .then((_val) => {
        //@ts-ignore
        mutation.mutate(values);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const onOtp = (e: FormEvent) => {
    e.preventDefault();
    const value = {
      //@ts-ignore
      otp: e.target["otp"].value,
    };

    otpSchema
      .validate(value)
      .then((_val) => {
        //@ts-ignore
        verifyOtpMutation({ ...value, id }, id);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="h-screen my-auto">
      <div className=" absolute scale- top-[98px] left[-40px]">
        <img src="" alt="" />
      </div>
      <div className="pt-36 bg-gradien flex items-center justify-center my-auto">
        <div className="text-center logoLogin flex flex-col justify-center items-center absolute top-[13%] md:top-[12%]">
          <img src="" alt="" />
          {/* <div className='flex items-center gap-5 text-3xl mb-10'>
                        Perfomance Metric
                    </div> */}
        </div>

        <div className="login z-10 p-5 rounded-lg w-full max-w-[23rem]  md:bg-white bg-transparent">
          <div className="p-[10px]">
            {/* <span className='text-[#949AB1] text-sm'>Welcome Back,</span>
                        <h1 className='font-bold'>Admin</h1> */}
          </div>

          <div className="text-center my-4">
            <p className={`${!isOtp ? "text-lg" : "text-md"} text-neutral-500`}>
              {!isOtp ? (
                <>
                  Welcome to{" "}
                  <span className="font-bold text-[#2B8572]">
                    Performance App
                  </span>
                </>
              ) : (
                <>Please Input your 6 digit OTP</>
              )}
            </p>
          </div>
          {!isOtp ? (
            <form onSubmit={onFinish}>
              <Input
                label="Email"
                ref={formInput}
                type="email"
                name="email"
                placeholder="Email"
              />

              <Input
                label="Password"
                ref={formInput}
                type="password"
                name="password"
                placeholder="Password"
                // TrailingIcon={() => (
                //     <PasswordMe
                //         showPassword={showPassword}
                //         setShowPassword={setShowPassword}
                //     />
                // )}
              />

              {/* <div className="mb-3 userInput">
                <Link to="/reset" className="text-[#FF5A5A] font-bold text-sm">
                  Reset Passsword
                </Link>
              </div> */}

              <div className="flex items-center mt-10">
                <Button
                  className="w-full text-center"
                  disabled={mutation?.isLoading}
                  loading={mutation?.isLoading}
                  title="Sign In"
                  type="submit"
                  // onClick={() => navigate('/home')}
                />
              </div>
            </form>
          ) : (
            <>
              <form className="flex flex-col gap-8 w-full" onSubmit={onOtp}>
                <Input
                  label="Enter OTP"
                  type={"number"}
                  name="otp"
                  width={"100%"}
                  ref={otpRef}
                />
                <Button
                  className="w-full text-center"
                  title="Enter Otp"
                  type="submit"
                  loading={otpLoading}
                  disabled={otpLoading}
                >
                  Submit
                </Button>
              </form>
              <p
                className="cursor-pointer  text-center text-[#2B8572] mt-8"
                onClick={() => setIsOtp(false)}
              >
                Back to Login
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
