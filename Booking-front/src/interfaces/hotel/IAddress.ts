import { City } from "interfaces/city";

export interface IAddress {
    id: number;
    street: string;
    houseNumber: string;
    latitude: number;
    longitude: number;
    city: City;
}

export interface IAddressCreate {
    street: string;
    houseNumber: string;
    floor?: number;
    apartmentNumber?: string;
    cityId: number;
}