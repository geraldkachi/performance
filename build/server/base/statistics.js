import { instance, next } from "./base";
export const getStatistics = async (id) => {
    const { data } = await instance()
        .get(`/statistic${id ? `?staffId=${id}` : ``}`)
        .catch((e) => {
        return next(e);
    });
    return data;
};
