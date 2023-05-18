import { instance, next } from "./base";
export const createStaff = async (payload) => {
    const { data } = await instance()
        .post(`/staff/create`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const getStaffs = async (limit, page) => {
    const { data } = await instance()
        .get(`/staff?limit=${limit}&page=${page}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const changePassword = async (payload) => {
    const { data } = await instance()
        .patch(`/staff/change-password`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const getStaff = async (id) => {
    const { data } = await instance()
        .get(`/staff/single/${id}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
