
import { instance, next } from "./base";

export const getStandUp = async (limit?: string | number) => {
    const { data } = await instance()
        .get(`/standup?page=1&limit=${limit}`, )
        .catch((e) => {
            return next(e);
        });

    return data;
};
