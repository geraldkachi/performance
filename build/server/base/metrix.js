import { instance, next } from "./base";
export const getMetrics = async (page, limit, id) => {
    const { data } = await instance()
        .get(`/metric?page=${page}&limit=${limit}${id ? `&standupId=${id}` : ``}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const getMetric = async (standupId, staffId, id) => {
    const { data } = await instance()
        .get(`/metric/single?standupId=${standupId}&staffId=${staffId}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const getOverallPerformance = async (fromDate, toDate) => {
    const { data } = await instance()
        .get(`/metric/performance${fromDate && toDate ? `?fromDate=${fromDate}&toDate=${toDate}` : ``}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const updateMetrics = async (payload) => {
    const { data } = await instance()
        .put(`/metric/single/${payload?.id}`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const createMetrics = async (payload) => {
    const { data } = await instance()
        .post(`metric/single`, payload)
        .catch((e) => {
        return next(e);
    });
    return data;
};
export const getStaffMetric = async (id) => {
    const { data } = await instance()
        .get(`/metric/stats/${id}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
