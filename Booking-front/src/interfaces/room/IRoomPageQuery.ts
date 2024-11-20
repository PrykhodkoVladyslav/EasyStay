import IPaginationFilter from "interfaces/page/IPaginationFilter";

export default interface IRoomPageQuery extends IPaginationFilter {
    name?: string;

    area?: number;
    minArea?: number;
    maxArea?: number;

    numberOfRooms?: number;
    minNumberOfRooms?: number;
    maxNumberOfRooms?: number;

    quantity?: number;
    minQuantity?: number;
    maxQuantity?: number;

    freePeriod?: { from: string; to: string };

    hotelId?: number;
    roomTypeId?: number;

    allRentalPeriodIds?: number[];
    anyRentalPeriodIds?: number[];

    allAmenityIds?: number[];
    anyAmenityIds?: number[];
}

export function toQueryFromIRoomPageQuery(query: IRoomPageQuery): string {
    const queryItems: { key: string; value: string }[] = [];

    if (query.name !== undefined) queryItems.push({ key: "name", value: query.name });
    if (query.area !== undefined) queryItems.push({ key: "area", value: query.area.toString() });
    if (query.minArea !== undefined) queryItems.push({ key: "minArea", value: query.minArea.toString() });
    if (query.maxArea !== undefined) queryItems.push({ key: "maxArea", value: query.maxArea.toString() });

    if (query.numberOfRooms !== undefined) queryItems.push({ key: "numberOfRooms", value: query.numberOfRooms.toString() });
    if (query.minNumberOfRooms !== undefined) queryItems.push({ key: "minNumberOfRooms", value: query.minNumberOfRooms.toString() });
    if (query.maxNumberOfRooms !== undefined) queryItems.push({ key: "maxNumberOfRooms", value: query.maxNumberOfRooms.toString() });

    if (query.quantity !== undefined) queryItems.push({ key: "quantity", value: query.quantity.toString() });
    if (query.minQuantity !== undefined) queryItems.push({ key: "minQuantity", value: query.minQuantity.toString() });
    if (query.maxQuantity !== undefined) queryItems.push({ key: "maxQuantity", value: query.maxQuantity.toString() });

    if (query.freePeriod) {
        if (query.freePeriod.from) queryItems.push({ key: "freePeriod.from", value: query.freePeriod.from });
        if (query.freePeriod.to) queryItems.push({ key: "freePeriod.to", value: query.freePeriod.to });
    }

    if (query.hotelId !== undefined) queryItems.push({ key: "hotelId", value: query.hotelId.toString() });
    if (query.roomTypeId !== undefined) queryItems.push({ key: "roomTypeId", value: query.roomTypeId.toString() });

    if (query.allRentalPeriodIds && query.allRentalPeriodIds.length > 0) {
        queryItems.push({ key: "allRentalPeriodIds", value: query.allRentalPeriodIds.join(",") });
    }
    if (query.anyRentalPeriodIds && query.anyRentalPeriodIds.length > 0) {
        queryItems.push({ key: "anyRentalPeriodIds", value: query.anyRentalPeriodIds.join(",") });
    }

    if (query.allAmenityIds && query.allAmenityIds.length > 0) {
        queryItems.push({ key: "allAmenityIds", value: query.allAmenityIds.join(",") });
    }
    if (query.anyAmenityIds && query.anyAmenityIds.length > 0) {
        queryItems.push({ key: "anyAmenityIds", value: query.anyAmenityIds.join(",") });
    }

    return queryItems.map(item => `${item.key}=${encodeURIComponent(item.value)}`).join("&");
}
