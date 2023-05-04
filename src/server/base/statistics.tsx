import { instance, next } from "./base";

export const getStatistic = async () => {
    const { data } = await instance()
        .get(`/statistic`)
        .catch((e) => {
            return next(e);
        });

    return data;
};
