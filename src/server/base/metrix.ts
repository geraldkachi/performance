
import { instance, next } from "./base";

export const getMetrics = async (page?: string | number, limit?: string | number, id?: string | null) => {
    const { data } = await instance()
        .get(`/metric?page=${page}&limit=${limit}&standupId=${id}`)

        .catch((e) => {
            return next(e);
        });

    return data;
};
export const getMetric = async (standupId: string, staffId?: string, id?: string | null) => {
    const { data } = await instance()
        .get(`/metric/single?standupId=${standupId}&staffId=${staffId}`)

        .catch((e) => {
            return next(e);
        });

    return data;
};

export const getOverallPerformance = async (fromDate?: string, toDate?: string) => {
    const { data } = await instance()
        .get(`/metric/performance${fromDate && toDate ? `?fromDate=${fromDate}&toDate=${toDate}` : ``}`)
        .catch((e) => {
            return next(e);
        });

    return data;
};


export const updateMetrics = async ( payload?: any) => {
    const { data } = await instance()
        .put(`/metric/single/${payload?.id}`, payload)
        .catch((e) => {
            return next(e);
        });

    return data;
};

export const createMetrics = async ( payload?: any) => {
    const { data } = await instance()
        .post(`metric/single`, payload)
        .catch((e) => {
            return next(e);
        });

    return data;
};
