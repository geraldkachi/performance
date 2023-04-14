
import { instance, next } from "./base";

export const getMetric = async (limit?: string | number) => {
    const { data } = await instance()
        .get(`/metric?page=1&limit=${limit}`, )
        .catch((e) => {
            return next(e);
        });

    return data;
};
