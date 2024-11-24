import IBookingRoomVariant from "interfaces/booking/IBookingRoomVariant.ts";
import { IHotel } from "interfaces/hotel/IHotel.ts";

export interface IBooking {
    id: number;

    dateFrom: Date;

    dateTo: Date;

    personalWishes?: string;

    estimatedTimeOfArrivalUtc: Date;

    amountToPay: number;

    bookingRoomVariants: IBookingRoomVariant[];

    hotel: IHotel;

    hasReview: boolean;
}
