import IPaginationFilter from "interfaces/page/IPaginationFilter.ts";

export default interface IBookingsPageQuery extends IPaginationFilter {
    orderBy?: string;
}

export function toQueryFromIBookingsPageQuery(query: IBookingsPageQuery) {
    const queryItems: { key: string, value: string }[] = [];
    const queryArrayItems: string[] = [];

    if (query.orderBy)
        queryItems.push({ key: "orderBy", value: query.orderBy });

    return queryItems.map(item => `${item.key}=${item.value}`)
        .concat(queryArrayItems)
        .join("&");
}