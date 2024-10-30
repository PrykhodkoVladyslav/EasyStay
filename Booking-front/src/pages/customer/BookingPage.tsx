import { useParams } from "react-router-dom";
import "./../../css/booking-page.scss";
import StageIndicator from "components/partials/customer/StageIndicator.tsx";

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

    return (
        <div className="booking-page-main-container">
            <StageIndicator options={["Ваш вибір", "Ваші дані", "Завершальний крок"]} currentOptionIndex={1} />
        </div>
    );
};

export default BookingPage;