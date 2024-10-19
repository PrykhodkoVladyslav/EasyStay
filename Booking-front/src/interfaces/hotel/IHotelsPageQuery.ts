import IPaginationFilter from "interfaces/page/IPaginationFilter.ts";

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

    isArchived?: boolean;

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