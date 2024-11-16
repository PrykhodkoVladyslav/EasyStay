import IPaginationFilter from "interfaces/page/IPaginationFilter.ts";

export default interface IGetCitiesAdvertisingPageQuery extends IPaginationFilter {
    hasMinPrice?: boolean;
}

export function toQueryFromIGetCitiesAdvertisingPageQuery(query: IGetCitiesAdvertisingPageQuery) {
    const queryItems: { key: string, value: string }[] = [];

    if (query.pageIndex != undefined)
        queryItems.push({ key: "pageIndex", value: query.pageIndex.toString() });

    if (query.pageSize != undefined)
        queryItems.push({ key: "pageSize", value: query.pageSize.toString() });

    if (query.hasMinPrice !== undefined)
        queryItems.push({ key: "hasMinPrice", value: query.hasMinPrice.toString() });

    return queryItems.map(item => `${item.key}=${item.value}`)
        .join("&");
}
