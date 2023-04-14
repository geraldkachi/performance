import { instance, next } from "./base";

export const getTasks = async (limit?: string | number) => {
    const { data } = await instance()
        .get(`/task?page=1&limit=${limit}`, )
        .catch((e) => {
            return next(e);
        });

    return data;
};
export const createTask = async (payload: any) => {
    const { data } = await instance()
        .post(`/task`, payload)
        .catch((e) => {
            return next(e);
        });

    return data;
};
