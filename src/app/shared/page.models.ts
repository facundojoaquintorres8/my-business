import {PAGE_LIMIT} from '../app.constants';

export interface IPage {
    size: number;
    totalElements: number;
    totalPages: number;
    offset: number;
    filter: any;
    order?: string[];
}

export const newPage = (filter: any, order?: string[]): IPage => {
    return {
        size: PAGE_LIMIT,
        totalElements: 0,
        totalPages: 0,
        offset: 0,
        filter: filter,
        order: order,
    };
};

export const totalPages = (size: number, totalElements: number): number => {
    const count = size < 1 ? 1 : Math.ceil(totalElements / size);
    return Math.max(count || 0, 1);
};
