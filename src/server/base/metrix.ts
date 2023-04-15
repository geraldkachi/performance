
import { instance, next } from "./base";

export const getMetrics = async (page?: string | number, limit?: string | number, id?: string | null) => {
    const { data } = await instance()
        .get(`/metric?${page}=1&${limit}=10&standupId=${id}`)

        .catch((e) => {
            return next(e);
        });

    return data;
};
