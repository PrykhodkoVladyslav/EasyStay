import { City } from "interfaces/city";

export interface IAddress {
    id: number;
    street: string;
    houseNumber: string;
    latitude: number;
    longitude: number;
    city: City;
}
