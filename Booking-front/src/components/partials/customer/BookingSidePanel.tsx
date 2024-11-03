import "./../../../css/booking-side-panel.scss";
import { addDays, differenceInDays, format } from "date-fns";
import { uk } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { IRoomVariantWithQuantity } from "pages/customer/BookingPage.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

export interface IBookingSidePanelProps {
    hotelId: number;
    selectedRoomVariants: IRoomVariantWithQuantity[];

    dateFrom: Date;
    dateTo: Date;
    arrivalTimeUtcFrom: string;
    departureTimeUtcFrom: string;
}

const BookingSidePanel = (props: IBookingSidePanelProps) => {
    const navigate = useNavigate();

    const formatDate = (date: Date) => format(date, "EEEEEE, d MMM yyyy", { locale: uk });
    const timeFromString = (time: string) => new Date(`0001-01-01T${time}Z`);
    const formatTime = (time: string) => format(timeFromString(time), "HH:mm");

    const formattedDateFrom = formatDate(props.dateFrom);
    const formattedDateTo = formatDate(props.dateTo);

    const stayDays = differenceInDays(props.dateTo, props.dateFrom) + 1;

    const sumDiscountPrice = props.selectedRoomVariants
        .map(r => r.roomVariant.discountPrice ?? r.roomVariant.price)
        .reduce((a, b) => a + b, 0);

    const sumPrice = props.selectedRoomVariants
        .map(r => r.roomVariant.price)
        .reduce((a, b) => a + b, 0);

    const dayBeforeBooking = addDays(props.dateFrom, -1);
    const formattedDayBeforeBooking = format(dayBeforeBooking, "d MMM", { locale: uk });

    return (
        <div className="booking-side-panel">
            <div className="booking-info-block booking-side-block">
                <div className="booking-info-top">
                    <p className="booking-info-header">Інформація про ваше бронювання</p>
                    <div className="booking-info-dates">
                        <div className="date-container">
                            <p className="date-header">Заїзд</p>
                            <p className="date-value">{formattedDateFrom}</p>
                            <p className="time-value">З {formatTime(props.arrivalTimeUtcFrom)}</p>
                        </div>
                        <div className="dates-separator" />
                        <div className="date-container">
                            <p className="date-header">Виїзд</p>
                            <p className="date-value">{formattedDateTo}</p>
                            <p className="time-value">З {formatTime(props.departureTimeUtcFrom)}</p>
                        </div>
                    </div>

                    <div className="booking-total-time-container">
                        <p className="total-time-header">Загальний час перебування:</p>
                        <p className="total-time-value">{stayDays} ночей</p>
                    </div>
                </div>

                <div className="vertical-separator" />

                <button className="change-selection-button" onClick={() => navigate(`/hotel/${props.hotelId}`)}>
                    Змінити вибір
                </button>
            </div>

            <div className="booking-price-block booking-side-block">
                <div className="price-details-block price-padding">
                    <p className="price-header">Деталі ціни</p>
                    <div className="price-value-block sides-container">
                        <p className="price-value-title">Початкова ціна</p>
                        <p className="price-value">${Math.floor(sumPrice)}</p>
                    </div>
                </div>

                <div className="total-price-block price-padding">
                    {sumDiscountPrice !== sumPrice && <p className="full-price">${Math.floor(sumPrice)}</p>}
                    <div className="total-price-container sides-container">
                        <p className="total-price-title">Усього</p>
                        <p className="total-price-value">${Math.floor(sumDiscountPrice)}</p>
                    </div>
                    <p className="tax-info-label">Включає податок</p>
                </div>

                <div className="tax-info-container price-padding">
                    <p className="tax-info-header">Інформація про ціну</p>
                    <div className="tax-info-value-container">
                        <div className="tax-info-title-container">
                            <img src={getPublicResourceUrl("icons/money/money.svg")} alt="tax-icon" />
                            <p className="tax-info-title">Податок</p>
                        </div>
                        <p className="tax-info-value">$20</p>
                    </div>
                </div>
            </div>

            <div className="cancellation-info-block booking-side-block">
                <p className="cancellation-header">Яка вартість скасування?</p>
                <p className="cancellation-message">Безкоштовно скасування до {formattedDayBeforeBooking}</p>

                <div className="cancellation-date-price sides-container">
                    <p>З 00:00, {formattedDayBeforeBooking}</p>
                    <p>${Math.floor(sumDiscountPrice)}</p>
                </div>
            </div>
        </div>
    );
};

export default BookingSidePanel;