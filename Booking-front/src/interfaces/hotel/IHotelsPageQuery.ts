import IPaginationFilter from "interfaces/page/IPaginationFilter.ts";
import IHotelAddressFilter from "interfaces/hotel/IHotelAddressFilter.ts";
import IHotelFreeDatePeriod from "interfaces/hotel/IHotelFreeDatePeriod.ts";
import IHotelBedInfoFilter from "interfaces/hotel/IHotelBedInfoFilter.ts";

export default interface IHotelsPageQuery extends IPaginationFilter {
    name?: string;

    description?: string;

    arrivalTimeUtcFrom?: string;
    minArrivalTimeUtcFrom?: string;
    maxArrivalTimeUtcFrom?: string;

    arrivalTimeUtcTo?: string;
    minArrivalTimeUtcTo?: string;
    maxArrivalTimeUtcTo?: string;

    departureTimeUtcFrom?: string;
    minDepartureTimeUtcFrom?: string;
    maxDepartureTimeUtcFrom?: string;

    departureTimeUtcTo?: string;
    minDepartureTimeUtcTo?: string;
    maxDepartureTimeUtcTo?: string;

    minPrice?: number;
    maxPrice?: number;

    minRating?: number;

    hasAnyRoomVariant?: boolean;

    minNumberOfRooms?: number;

    minAdultGuests?: number;

    freePeriod?: IHotelFreeDatePeriod;

    isArchived?: boolean;

    address?: IHotelAddressFilter;

    categoryId?: number;

    realtorId?: number;

    hasDiscount?: boolean;

    onlyOwn?: boolean;

    isFavorite?: boolean;

    orderBy?: string;

    isRandomItems?: boolean;

    allHotelAmenityIds?: number[];
    anyHotelAmenityIds?: number[];

    allBreakfastIds?: number[];
    anyBreakfastIds?: number[];

    allLanguageIds?: number[];
    anyLanguageIds?: number[];

    allRoomAmenityIds?: number[];
    anyRoomAmenityIds?: number[];

    allowedRealtorGenders?: number[];

    bedInfo?: IHotelBedInfoFilter;
}

export function toQueryFromIHotelsPageQuery(query: IHotelsPageQuery) {
    const queryItems: { key: string, value: string }[] = [];
    const queryArrayItems: string[] = [];

    if (query.pageIndex != undefined)
        queryItems.push({ key: "pageIndex", value: query.pageIndex.toString() });

    if (query.pageSize != undefined)
        queryItems.push({ key: "pageSize", value: query.pageSize.toString() });

    if (query.name)
        queryItems.push({ key: "name", value: query.name });

    if (query.description)
        queryItems.push({ key: "description", value: query.description });

    if (query.arrivalTimeUtcFrom)
        queryItems.push({ key: "arrivalTimeUtcFrom", value: query.arrivalTimeUtcFrom });
    if (query.minArrivalTimeUtcFrom)
        queryItems.push({ key: "minArrivalTimeUtcFrom", value: query.minArrivalTimeUtcFrom });
    if (query.maxArrivalTimeUtcFrom)
        queryItems.push({ key: "maxArrivalTimeUtcFrom", value: query.maxArrivalTimeUtcFrom });

    if (query.arrivalTimeUtcTo)
        queryItems.push({ key: "arrivalTimeUtcTo", value: query.arrivalTimeUtcTo });
    if (query.minArrivalTimeUtcTo)
        queryItems.push({ key: "minArrivalTimeUtcTo", value: query.minArrivalTimeUtcTo });
    if (query.maxArrivalTimeUtcTo)
        queryItems.push({ key: "maxArrivalTimeUtcTo", value: query.maxArrivalTimeUtcTo });

    if (query.departureTimeUtcFrom)
        queryItems.push({ key: "departureTimeUtcFrom", value: query.departureTimeUtcFrom });
    if (query.minDepartureTimeUtcFrom)
        queryItems.push({ key: "minDepartureTimeUtcFrom", value: query.minDepartureTimeUtcFrom });
    if (query.maxDepartureTimeUtcFrom)
        queryItems.push({ key: "maxDepartureTimeUtcFrom", value: query.maxDepartureTimeUtcFrom });

    if (query.departureTimeUtcTo)
        queryItems.push({ key: "departureTimeUtcTo", value: query.departureTimeUtcTo });
    if (query.minDepartureTimeUtcTo)
        queryItems.push({ key: "minDepartureTimeUtcTo", value: query.minDepartureTimeUtcTo });
    if (query.maxDepartureTimeUtcTo)
        queryItems.push({ key: "maxDepartureTimeUtcTo", value: query.maxDepartureTimeUtcTo });

    if (query.minPrice)
        queryItems.push({ key: "minPrice", value: query.minPrice.toString() });

    if (query.maxPrice)
        queryItems.push({ key: "maxPrice", value: query.maxPrice.toString() });

    if (query.minRating)
        queryItems.push({ key: "minRating", value: query.minRating.toString() });

    if (query.hasAnyRoomVariant)
        queryItems.push({ key: "hasAnyRoomVariant", value: query.hasAnyRoomVariant.toString() });

    if (query.minNumberOfRooms)
        queryItems.push({ key: "minNumberOfRooms", value: query.minNumberOfRooms.toString() });

    if (query.minAdultGuests)
        queryItems.push({ key: "minAdultGuests", value: query.minAdultGuests.toString() });

    if (query.freePeriod) {
        queryItems.push({ key: "freePeriod.from", value: query.freePeriod.from });
        queryItems.push({ key: "freePeriod.to", value: query.freePeriod.to });
    }

    if (query.isArchived != undefined)
        queryItems.push({ key: "isArchived", value: query.isArchived.toString() });

    if (query.address) {
        const address = query.address;

        if (address.id)
            queryItems.push({ key: "address.id", value: address.id.toString() });

        if (address.street)
            queryItems.push({ key: "address.street", value: address.street });

        if (address.houseNumber)
            queryItems.push({ key: "address.houseNumber", value: address.houseNumber });

        if (address.byFloor)
            queryItems.push({ key: "address.byFloor", value: address.byFloor.toString() });

        if (address.floor)
            queryItems.push({ key: "address.floor", value: address.floor.toString() });

        if (address.byApartmentNumber)
            queryItems.push({ key: "address.byApartmentNumber", value: address.byApartmentNumber.toString() });

        if (address.apartmentNumber)
            queryItems.push({ key: "address.apartmentNumber", value: address.apartmentNumber });

        if (address.city) {
            const city = address.city;

            if (city.id)
                queryItems.push({ key: "address.city.id", value: city.id.toString() });

            if (city.name)
                queryItems.push({ key: "address.city.name", value: city.name });

            if (city.longitude)
                queryItems.push({ key: "address.city.longitude", value: city.longitude.toString() });
            if (city.latitude)
                queryItems.push({ key: "address.city.latitude", value: city.latitude.toString() });

            if (city.minLongitude)
                queryItems.push({ key: "address.city.minLongitude", value: city.minLongitude.toString() });
            if (city.maxLongitude)
                queryItems.push({ key: "address.city.maxLongitude", value: city.maxLongitude.toString() });
            if (city.minLatitude)
                queryItems.push({ key: "address.city.minLatitude", value: city.minLatitude.toString() });
            if (city.maxLatitude)
                queryItems.push({ key: "address.city.maxLatitude", value: city.maxLatitude.toString() });

            if (city.countryId)
                queryItems.push({ key: "address.city.countryId", value: city.countryId.toString() });
        }
    }

    if (query.categoryId)
        queryItems.push({ key: "categoryId", value: query.categoryId.toString() });

    if (query.realtorId)
        queryItems.push({ key: "realtorId", value: query.realtorId.toString() });

    if (query.hasDiscount)
        queryItems.push({ key: "hasDiscount", value: query.hasDiscount.toString() });

    if (query.onlyOwn != undefined)
        queryItems.push({ key: "onlyOwn", value: query.onlyOwn.toString() });

    if (query.isFavorite != undefined)
        queryItems.push({ key: "isFavorite", value: query.isFavorite.toString() });

    if (query.orderBy)
        queryItems.push({ key: "orderBy", value: query.orderBy });

    if (query.isRandomItems != undefined)
        queryItems.push({ key: "isRandomItems", value: query.isRandomItems.toString() });

    const arrayToQuery = (arr: number[], key: string) => {
        return arr.map(id => `${key}=${id}`).join("&");
    };

    if (query.allHotelAmenityIds && query.allHotelAmenityIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.allHotelAmenityIds, "allHotelAmenityIds"));
    if (query.anyHotelAmenityIds && query.anyHotelAmenityIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.anyHotelAmenityIds, "anyHotelAmenityIds"));

    if (query.allBreakfastIds && query.allBreakfastIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.allBreakfastIds, "allBreakfastIds"));
    if (query.anyBreakfastIds && query.anyBreakfastIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.anyBreakfastIds, "anyBreakfastIds"));

    if (query.allLanguageIds && query.allLanguageIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.allLanguageIds, "allLanguageIds"));
    if (query.anyLanguageIds && query.anyLanguageIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.anyLanguageIds, "anyLanguageIds"));

    if (query.allRoomAmenityIds && query.allRoomAmenityIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.allRoomAmenityIds, "allRoomAmenityIds"));
    if (query.anyRoomAmenityIds && query.anyRoomAmenityIds?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.anyRoomAmenityIds, "anyRoomAmenityIds"));

    if (query.allowedRealtorGenders && query.allowedRealtorGenders?.length !== 0)
        queryArrayItems.push(arrayToQuery(query.allowedRealtorGenders, "allowedRealtorGenders"));

    if (query.bedInfo) {
        const { hasSingleBed, hasDoubleBed, hasExtraBed, hasSofa, hasKingsizeBed } = query.bedInfo;

        if (hasSingleBed)
            queryItems.push({ key: "bedInfo.hasSingleBed", value: hasSingleBed.toString() });

        if (hasDoubleBed)
            queryItems.push({ key: "bedInfo.hasDoubleBed", value: hasDoubleBed.toString() });

        if (hasExtraBed)
            queryItems.push({ key: "bedInfo.hasExtraBed", value: hasExtraBed.toString() });

        if (hasSofa)
            queryItems.push({ key: "bedInfo.hasSofa", value: hasSofa.toString() });

        if (hasKingsizeBed)
            queryItems.push({ key: "bedInfo.hasKingsizeBed", value: hasKingsizeBed.toString() });
    }

    return queryItems.map(item => `${item.key}=${item.value}`)
        .concat(queryArrayItems)
        .join("&");
}