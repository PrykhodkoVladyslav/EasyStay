import { IAddress } from "interfaces/hotel/IAddress.ts";
import { HotelCategory } from "interfaces/hotelCategories";
import IHotelAmenity from "interfaces/hotelAmenity/IHotelAmenity.ts";
import IBreakfast from "interfaces/breakfast/IBreakfast.ts";
import ILanguage from "interfaces/language/ILanguage.ts";
import IPhoto from "interfaces/hotel/IPhoto.ts";
import IRoom from "interfaces/room/IRoom.ts";
import IHotelRealtor from "interfaces/hotel/IHotelRealtor.ts";

export default interface IHotelDetails {
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
    realtor: IHotelRealtor;
    hotelAmenities: IHotelAmenity[];
    breakfasts: IBreakfast[];
    languages: ILanguage[];
    photos: IPhoto[];
    rooms: IRoom[];
}