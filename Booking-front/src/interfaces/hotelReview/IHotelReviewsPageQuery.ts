import IPaginationFilter from "interfaces/page/IPaginationFilter";

export default interface IHotelReviewsPageQuery extends IPaginationFilter {
    description?: string;
    score?: number;
    minScore?: number;
    maxScore?: number;
    createdAtUtc?: string;
    minCreatedAtUtc?: string;
    maxCreatedAtUtc?: string;
    updatedAtUtc?: string;
    minUpdatedAtUtc?: string;
    maxUpdatedAtUtc?: string;
    authorId?: number;
    hotelId?: number;
}

export function toQueryFromIHotelReviewsPageQuery(query: IHotelReviewsPageQuery): string {
    const queryItems: { key: string; value: string }[] = [];

    if (query.pageIndex !== undefined) queryItems.push({ key: "pageIndex", value: query.pageIndex.toString() });
    if (query.pageSize !== undefined) queryItems.push({ key: "pageSize", value: query.pageSize.toString() });
    if (query.description) queryItems.push({ key: "description", value: query.description });
    if (query.score !== undefined) queryItems.push({ key: "score", value: query.score.toString() });
    if (query.minScore !== undefined) queryItems.push({ key: "minScore", value: query.minScore.toString() });
    if (query.maxScore !== undefined) queryItems.push({ key: "maxScore", value: query.maxScore.toString() });
    if (query.createdAtUtc) queryItems.push({ key: "createdAtUtc", value: query.createdAtUtc });
    if (query.minCreatedAtUtc) queryItems.push({ key: "minCreatedAtUtc", value: query.minCreatedAtUtc });
    if (query.maxCreatedAtUtc) queryItems.push({ key: "maxCreatedAtUtc", value: query.maxCreatedAtUtc });
    if (query.updatedAtUtc) queryItems.push({ key: "updatedAtUtc", value: query.updatedAtUtc });
    if (query.minUpdatedAtUtc) queryItems.push({ key: "minUpdatedAtUtc", value: query.minUpdatedAtUtc });
    if (query.maxUpdatedAtUtc) queryItems.push({ key: "maxUpdatedAtUtc", value: query.maxUpdatedAtUtc });
    if (query.authorId !== undefined) queryItems.push({ key: "authorId", value: query.authorId.toString() });
    if (query.hotelId !== undefined) queryItems.push({ key: "realtorId", value: query.hotelId.toString() });

    return queryItems.map(item => `${item.key}=${item.value}`).join("&");
}
