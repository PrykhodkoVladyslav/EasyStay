import { City } from "interfaces/city";
import { HotelCategories } from "interfaces/hotelCategories";
// import { PaginationOptions } from "interfaces/hotel.ts";
import { Photo } from "interfaces/photo";

export interface Address {
    id: number;
    street: string;
    houseNumber: string;
    latitude: number;
    longitude: number;
    city: City;
}
export interface Hotel {
    id: number;
    name: string;
    description: string;
    // rating: number;
    // reviews: number;
    area: number;
    numberOfRooms: number;
    address: Address;
    category: HotelCategories;
    realtor: Realtor;
    photos: Photo[];
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
