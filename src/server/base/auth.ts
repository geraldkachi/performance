import { instance, next } from "./base";

export const login = async (payload: {
  phoneNumber: string;
  password: string;
}) => {
  const { data } = await instance()
    .post(`/staff/login`, payload)
    .catch((e) => {
      return next(e);
    });

  return data;
};

export const verifyOtp = async (payload?: { otp: string, id: string },  id?: string | number) => {
  const { data } = await instance()
    .post(`/staff/verify-otp/${payload?.id}`, payload)
    .catch((e) => {
      return next(e);
    });

  return data;
};

export const resendOtp = async (payload: { id: string }) => {
  const { data } = await instance()
    .post(`/staff/resend-otp`, payload)
    .catch((e) => {
      return next(e);
    });

  return data;
};
