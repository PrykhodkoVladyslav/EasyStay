import IHotelAddressCityFilter from "interfaces/hotel/IHotelAddressCityFilter.ts";

export default interface IHotelAddressFilter {
    id?: number;

    street?: string;

    houseNumber?: string;

    byFloor?: boolean;
    floor?: number;

    byApartmentNumber?: boolean;
    apartmentNumber?: string;

    city?: IHotelAddressCityFilter;
}