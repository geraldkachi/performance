import { instance, next } from "./base";
export const getTasks = async (page, limit, staffId) => {
    const { data } = await instance()
        .get(`/task?page=${page}&limit=${limit}${staffId ? `&staffId=${staffId}` : ``}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const deleteTask = async (id) => {
    const { data } = await instance()
        .delete(`/task/${id}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const getTaskById = async (id) => {
    const { data } = await instance()
        .get(`/task/${id}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const createTask = async (payload) => {
    const { data } = await instance()
        .post(`/task`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
