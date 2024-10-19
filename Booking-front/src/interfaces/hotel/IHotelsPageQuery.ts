import IPaginationFilter from "interfaces/page/IPaginationFilter.ts";
import IHotelAddressFilter from "interfaces/hotel/IHotelAddressFilter.ts";

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

    isArchived?: boolean;

    address: IHotelAddressFilter;

    categoryId?: number;

    realtorId?: number;

    onlyOwn?: boolean;

    isRandomItems?: boolean;

    allHotelAmenityIds?: number[];
    anyHotelAmenityIds?: number[];

    allBreakfastIds?: number[];
    anyBreakfastIds?: number[];

    allLanguageIds?: number[];
    anyLanguageIds?: number[];
}

export function toQueryFromIHotelsPageQuery(query: IHotelsPageQuery) {
    const queryItems: { key: string, value: string }[] = [];

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

    if (query.isArchived)
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

    if (query.onlyOwn)
        queryItems.push({ key: "onlyOwn", value: query.onlyOwn.toString() });

    if (query.isRandomItems)
        queryItems.push({ key: "isRandomItems", value: query.isRandomItems.toString() });

    const arrayToQuery = (arr: number[], key: string) => {
        return arr.map(id => `${key}=${id}`).join("&");
    };

    if (query.allHotelAmenityIds && query.allHotelAmenityIds?.length !== 0)
        queryItems.push({
            key: "allHotelAmenityIds",
            value: arrayToQuery(query.allHotelAmenityIds, "allHotelAmenityIds"),
        });

    if (query.anyHotelAmenityIds && query.anyHotelAmenityIds?.length !== 0)
        queryItems.push({
            key: "anyHotelAmenityIds",
            value: arrayToQuery(query.anyHotelAmenityIds, "anyHotelAmenityIds"),
        });

    if (query.allBreakfastIds && query.allBreakfastIds?.length !== 0)
        queryItems.push({
            key: "allBreakfastIds",
            value: arrayToQuery(query.allBreakfastIds, "allBreakfastIds"),
        });

    if (query.anyBreakfastIds && query.anyBreakfastIds?.length !== 0)
        queryItems.push({
            key: "anyBreakfastIds",
            value: arrayToQuery(query.anyBreakfastIds, "anyBreakfastIds"),
        });

    if (query.allLanguageIds && query.allLanguageIds?.length !== 0)
        queryItems.push({
            key: "allLanguageIds",
            value: arrayToQuery(query.allLanguageIds, "allLanguageIds"),
        });

    if (query.anyLanguageIds && query.anyLanguageIds?.length !== 0)
        queryItems.push({
            key: "anyLanguageIds",
            value: arrayToQuery(query.anyLanguageIds, "anyLanguageIds"),
        });

    return queryItems.map(item => `${item.key}=${item.value}`).join("&");
}