// import { PaginationOptions } from "interfaces/hotel.ts";

export interface IAddressCreate {
    street: string;
    houseNumber: string;
    floor?: number;
    apartmentNumber?: string;
    cityId: number;
}

export interface IHotelCreate {
    name: string;
    description: string;
    arrivalTimeUtcFrom: string;
    arrivalTimeUtcTo: string;
    departureTimeUtcFrom: string;
    departureTimeUtcTo: string;
    isArchived?: boolean;
    address: IAddressCreate;
    categoryId: number;
    hotelAmenityIds?: number[];
    breakfastIds?: number[];
    staffLanguageIds?: number[];
    photos: File[];
}

export interface Realtor {
    id: number;
}

export interface SetArchiveStatusRequest {
    id: number;
    isArchived: boolean;
}

// export interface GetHotelPageRequest extends PaginationOptions {
//     userId?: number;
//     name?: string;
//     description?: string;
//     rating?: number;
//     minRating?: number;
//     maxRating?: number;
//     typeId?: number;
//     address?: HotelAddress;
// }
