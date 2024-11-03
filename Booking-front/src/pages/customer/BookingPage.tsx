import { useParams } from "react-router-dom";
import "./../../css/booking-page.scss";
import StageIndicator from "components/partials/customer/StageIndicator.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { useGetHotelQuery } from "services/hotel.ts";
import BookingSidePanel from "components/partials/customer/BookingSidePanel.tsx";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";
import { useEffect, useState } from "react";

export interface IBookingPageExternalInformation {
    hotelId: number;

    bookingInfo: {
        dateFrom: Date;
        dateTo: Date;
        bookingRoomVariants: {
            roomVariantId: number;
            quantity: number;
            bookingBedSelection: {
                isSingleBed?: boolean;
                isDoubleBed?: boolean;
                isExtraBed?: boolean;
                isSofa?: boolean;
                isKingsizeBed?: boolean;
            };
        }[];
    };
}

interface IRoomVariantIdWithQuantity {
    roomVariantId: number;
    quantity: number;
}

export interface IRoomVariantWithQuantity {
    roomVariant: IRoomVariant;
    quantity: number;
}

const BookingPage = () => {
    const { data: bookingPageExternalInformation } = useParams();
    if (!bookingPageExternalInformation)
        throw new Error("No data provided");

    const parseBookingPageExternalInformation =
        () => JSON.parse(atob(bookingPageExternalInformation)) as IBookingPageExternalInformation;

    const [externalBookingInfo, setExternalBookingInfo] = useState(parseBookingPageExternalInformation);

    useEffect(() => {
        setExternalBookingInfo(parseBookingPageExternalInformation);
    }, [bookingPageExternalInformation]);

    const [selectedRoomVariants, setSelectedRoomVariants] = useState<IRoomVariantWithQuantity[]>([]);

    const { data: hotel } = useGetHotelQuery(externalBookingInfo.hotelId);

    useEffect(() => {
        const selectedRoomVariantIds = externalBookingInfo.bookingInfo.bookingRoomVariants
            .map(brv => ({
                roomVariantId: brv.roomVariantId,
                quantity: brv.quantity,
            }) as IRoomVariantIdWithQuantity);

        setSelectedRoomVariants(hotel?.rooms
            ?.map(r => r.variants)
            ?.flat()
            ?.filter(
                rv => selectedRoomVariantIds
                    .map(r => r.roomVariantId)
                    .includes(rv.id),
            )
            ?.map(r => ({
                roomVariant: r,
                quantity: selectedRoomVariantIds
                    .find(s => s.roomVariantId === r.id)?.quantity ?? new Error("No quantity"),
            } as IRoomVariantWithQuantity)) ?? []);
    }, [externalBookingInfo.bookingInfo.bookingRoomVariants, hotel]);

    // const json = JSON.stringify({
    //     hotelId: 1,
    //
    //     bookingInfo: {
    //         dateFrom: new Date(),
    //         dateTo: new Date(),
    //         bookingRoomVariants: [
    //             {
    //                 roomVariantId: 1,
    //                 quantity: 1,
    //                 bookingBedSelection: {
    //                     isSingleBed: true,
    //                 },
    //             },
    //             {
    //                 roomVariantId: 2,
    //                 quantity: 2,
    //                 bookingBedSelection: {
    //                     isDoubleBed: true,
    //                     isKingsizeBed: true,
    //                 },
    //             },
    //         ],
    //     },
    // } as IBookingPageExternalInformation);
    // const base64 = btoa(json);

    return <div className="booking-page-main-container">
        <StageIndicator options={["Ваш вибір", "Ваші дані", "Завершальний крок"]} currentOptionIndex={1} />

        <VerticalPad heightPx={46} />

        <div className="booking-info-container">
            {hotel && <BookingSidePanel
                hotelId={externalBookingInfo.hotelId}
                selectedRoomVariants={selectedRoomVariants}
                dateFrom={externalBookingInfo.bookingInfo.dateFrom}
                dateTo={externalBookingInfo.bookingInfo.dateTo}
                arrivalTimeUtcFrom={hotel.arrivalTimeUtcFrom}
                departureTimeUtcFrom={hotel.departureTimeUtcFrom}
            />}
            <div className="center-block">
                <p>Center block</p>
            </div>
        </div>

        <VerticalPad heightPx={40} />
    </div>;
};

export default BookingPage;