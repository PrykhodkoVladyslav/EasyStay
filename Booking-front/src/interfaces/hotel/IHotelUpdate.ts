import { IAddressCreate } from "interfaces/hotel/IAddressCreate.ts";

export interface IHotelUpdate {
    id: number;
    name: string;
    description: string;
    arrivalTimeUtcFrom: string;
    arrivalTimeUtcTo: string;
    departureTimeUtcFrom: string;
    departureTimeUtcTo: string;
    isArchived: boolean;
    address: IAddressCreate;
    categoryId: number;
    hotelAmenityIds?: number[];
    breakfastIds?: number[];
    staffLanguageIds?: number[];
    photos: File[];
}
