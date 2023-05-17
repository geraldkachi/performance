import { instance, next } from "./base";
export const getStandUp = async (limit, id) => {
    const { data } = await instance()
        .get(`/standup?page=1&limit=${limit}&standupId=${id}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const getStandUpOne = async (id) => {
    const { data } = await instance()
        .get(`/standup/${id}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const deleteStandUp = async (id) => {
    const { data } = await instance()
        .delete(`/standup/${id}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const createStandUp = async (payload) => {
    const { data } = await instance()
        .post(`/standup`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const endStandUpUpdate = async (payload) => {
    const { data } = await instance()
        .patch(`/standup?id=${payload?.id}`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
