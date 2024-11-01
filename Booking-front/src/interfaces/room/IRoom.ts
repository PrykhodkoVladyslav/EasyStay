import IRoomAmenity from "interfaces/roomAmenity/IRoomAmenity.ts";
import IRoomType from "interfaces/roomType/IRoomType.ts";
import IRentalPeriod from "interfaces/rentalPeriod/IRentalPeriod.ts";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";

export default interface IRoom {
    id: number;
    name: string;
    area: number;
    numberOfRooms: number;
    quantity: number;
    hotelId: number;
    roomType: IRoomType;
    rentalPeriods: IRentalPeriod[];
    amenities: IRoomAmenity[];
    variants: IRoomVariant[];
}

export interface RoomVariantsFreeRequest {
    id: number;
    FreePeriod: IFreePeriod;
}

export interface IFreePeriod {
    from: string;
    to: string;
}