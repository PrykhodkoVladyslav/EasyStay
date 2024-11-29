import IPaginationFilter from "interfaces/page/IPaginationFilter.ts";

export default interface IBookingsPageQuery extends IPaginationFilter {
    orderBy?: string;
}

export function toQueryFromIBookingsPageQuery(query: IBookingsPageQuery) {
    const queryItems: { key: string, value: string }[] = [];
    const queryArrayItems: string[] = [];

    if (query.pageIndex !== undefined) queryItems.push({ key: "pageIndex", value: query.pageIndex.toString() });
    if (query.pageSize !== undefined) queryItems.push({ key: "pageSize", value: query.pageSize.toString() });
    if (query.orderBy)
        queryItems.push({ key: "orderBy", value: query.orderBy });

    return queryItems.map(item => `${item.key}=${item.value}`)
        .concat(queryArrayItems)
        .join("&");
}