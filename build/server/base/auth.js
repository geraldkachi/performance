import { instance, next } from "./base";
export const login = async (payload) => {
    const { data } = await instance()
        .post(`/staff/login`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const verifyOtp = async (payload, id) => {
    const { data } = await instance()
        .post(`/staff/verify-otp/${payload?.id}`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const resendOtp = async (payload) => {
    const { data } = await instance()
        .post(`/staff/resend-otp`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
