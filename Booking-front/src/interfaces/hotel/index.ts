import { City } from "interfaces/city";
import { HotelCategories } from "interfaces/hotelCategories";
// import { PaginationOptions } from "interfaces/hotel.ts";

export interface IAddressCreate {
    id: number;
    street: string;
    houseNumber: string;
    floor?: number;
    apartmentNumber?: string;
    cityId: number;
}

export interface IHotelCreate {
    id: number;
    name: string;
    description: string;
    arrivalTimeUtcFrom: string;
    arrivalTimeUtcTo: string;
    departureTimeUtcFrom: string;
    departureTimeUtcTo: string;
    isArchived?: boolean;
    address: IAddressCreate;
    categoryId: number;
    hotelAmenityIds: number[];
    breakfastIds: number[];
    staffLanguageIds: number[];
    photos: File[];
}

export interface Photos {
    name: string;
}



export interface Realtor {
    id: number;
}

export interface SetArchiveStatusRequest {
    id: number;
    isArchived: boolean;
}

// export interface HotelAddressCity {
//     id?: number;
//     name?: string;
//     longitude?: number;
//     latitude?: number;
//     minLongitude?: number;
//     maxLongitude?: number;
//     minLatitude?: number;
//     maxLatitude?: number;
//     countryId?: number;
// }

// export interface HotelAddress {
//     id?: number;
//     street?: string;
//     houseNumber?: string;
//     country?: HotelAddressCity;
//     latitude?: string;
//     longitude?: string;
// }
//
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
//
// export interface CreateHotel {
//     name: string;
//     cityId: number;
//     categoryId: string;
//     description: string;
//     address: HotelAddress;
//     photos: File[];
// }
