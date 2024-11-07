import IBookingRoomVariant from "interfaces/booking/IBookingRoomVariant.ts";
import ICreateBankCardRequest from "interfaces/bankCard/ICreateBankCardRequest.ts";

export default interface ICreateBookingRequest {
    dateFrom: Date;

    dateTo: Date;

    personalWishes?: string;

    estimatedTimeOfArrivalUtc: Date;

    bankCardId?: number;

    bankCard?: ICreateBankCardRequest;

    bookingRoomVariants: IBookingRoomVariant[];
}
