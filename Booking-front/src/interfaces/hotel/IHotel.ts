import { HotelCategory } from "interfaces/hotelCategories";
import { IAddress, IAddressCreate } from "interfaces/hotel/IAddress.ts";
import IHotelAmenity from "interfaces/hotelAmenity/IHotelAmenity.ts";
import IPhoto from "interfaces/hotel/IPhoto.ts";
import IRealtorShortInfo from "interfaces/hotel/IRealtorShortInfo.ts";

export interface IHotel {
    id: number;
    name: string;
    description: string;
    arrivalTimeUtcFrom: string;
    arrivalTimeUtcTo: string;
    departureTimeUtcFrom: string;
    departureTimeUtcTo: string;
    minPrice?: number;
    rating: number;
    isArchived: boolean;
    address: IAddress;
    category: HotelCategory;
    realtorId: number;
    realtor: IRealtorShortInfo;
    hotelAmenities: IHotelAmenity[];
    photos: IPhoto[];
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
