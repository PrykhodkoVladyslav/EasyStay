import { useParams } from "react-router-dom";
import "./../../css/booking-page.scss";
import StageIndicator from "components/partials/customer/StageIndicator.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";

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

const BookingPage = () => {
    const { data: bookingPageExternalInformation } = useParams();

    if (!bookingPageExternalInformation)
        throw new Error("No data provided");

    const data = JSON.parse(atob(bookingPageExternalInformation)) as IBookingPageExternalInformation;
    console.log(data);

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
            <div className="side-block">
                <p>asdasd</p>
            </div>
            <div className="center-block">
                <p>asdasddasd</p>

            </div>
        </div>
    </div>;
};

export default BookingPage;