import { instance, next } from "./base";

export const getTasks = async (page: string | number, limit?: string | number) => {
    const { data } = await instance()
        .get(`/task?page=${page}&limit=${limit}`,)
        .catch((e) => {
            return next(e);
        });

    return data;
};
export const deleteTask = async (id: string) => {
    const { data } = await instance()
        .delete(`/task/${id}`)
        .catch((e) => {
            return next(e);
        });

    return data;
};

export const getTaskById = async (id: string | null | undefined) => {
    const { data } = await instance()
        .get(`/task/${id}`,)
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
