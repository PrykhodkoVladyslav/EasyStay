import { City } from "interfaces/city";

export interface IAddress {
    id: number;
    street: string;
    houseNumber: string;
    floor?: number;
    apartmentNumber?: string;
    city: City;
}
