import { CreateStaffType } from './../../../types.d';
import { instance, next } from "./base";


export const createStaff = async (payload: CreateStaffType) => {
    const { data } = await instance()
        .post(`/staff/create`, payload)
        .catch((e) => {
            return next(e);
        });

    return data;
};
