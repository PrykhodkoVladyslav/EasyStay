import { Country } from "interfaces/country";
// import { PaginationOptions } from "interfaces/hotel.ts";

export interface City {
    id: number;
    name: string;
    image: string;
    longitude: number;
    latitude: number;
    country: Country;
}

// export interface GetCityPageRequest extends PaginationOptions {
//     name?: string;
//     longitude?: number;
//     latitude?: number;
//     minLongitude?: number;
//     maxLongitude?: number;
//     minLatitude?: number;
//     maxLatitude?: number;
//     countryId?: number;
// }
