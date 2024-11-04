import styles from "./BookingSidePanel.module.scss";
import { addDays, differenceInDays, format } from "date-fns";
import { uk } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { IRoomVariantWithRoom } from "pages/customer/BookingPage.tsx";

export interface IBookingSidePanelProps {
    hotelId: number;
    selectedRoomVariants: IRoomVariantWithRoom[];

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
        <div className={styles["booking-side-panel"]}>
            <div className={styles["booking-info-block"] + " " + styles["booking-side-block"]}>
                <div className={styles["booking-info-top"]}>
                    <p className={styles["booking-info-header"]}>Інформація про ваше бронювання</p>
                    <div className={styles["booking-info-dates"]}>
                        <div className={styles["date-container"]}>
                            <p className={styles["date-header"]}>Заїзд</p>
                            <p className={styles["date-value"]}>{formattedDateFrom}</p>
                            <p className={styles["time-value"]}>З {formatTime(props.arrivalTimeUtcFrom)}</p>
                        </div>
                        <div className={styles["dates-separator"]} />
                        <div className={styles["date-container"]}>
                            <p className={styles["date-header"]}>Виїзд</p>
                            <p className={styles["date-value"]}>{formattedDateTo}</p>
                            <p className={styles["time-value"]}>З {formatTime(props.departureTimeUtcFrom)}</p>
                        </div>
                    </div>

                    <div className={styles["booking-total-time-container"]}>
                        <p className={styles["total-time-header"]}>Загальний час перебування:</p>
                        <p className={styles["total-time-value"]}>{stayDays} ночей</p>
                    </div>
                </div>

                <div className={styles["vertical-separator"]} />

                <button className={styles["change-selection-button"]}
                        onClick={() => navigate(`/hotel/${props.hotelId}`)}>
                    Змінити вибір
                </button>
            </div>

            <div className={styles["booking-price-block"] + " " + styles["booking-side-block"]}>
                <div className={styles["price-details-block"] + " " + styles["price-padding"]}>
                    <p className={styles["price-header"]}>Деталі ціни</p>
                    <div className={styles["price-value-block"] + " " + styles["sides-container"]}>
                        <p className={styles["price-value-title"]}>Початкова ціна</p>
                        <p className={styles["price-value"]}>${Math.floor(sumPrice)}</p>
                    </div>
                </div>

                <div className={styles["total-price-block"] + " " + styles["price-padding"]}>
                    {sumDiscountPrice !== sumPrice && <p className={styles["full-price"]}>${Math.floor(sumPrice)}</p>}
                    <div className={styles["total-price-container"] + " " + styles["sides-container"]}>
                        <p className={styles["total-price-title"]}>Усього</p>
                        <p className={styles["total-price-value"]}>${Math.floor(sumDiscountPrice)}</p>
                    </div>
                    <p className={styles["tax-info-label"]}>Включає податок</p>
                </div>

                <div className={styles["tax-info-container"] + " " + styles["price-padding"]}>
                    <p className={styles["tax-info-header"]}>Інформація про ціну</p>
                    <div className={styles["tax-info-value-container"]}>
                        <div className={styles["tax-info-title-container"]}>
                            <img src={getPublicResourceUrl("icons/money/money.svg")} alt="tax-icon" />
                            <p className={styles["tax-info-title"]}>Податок</p>
                        </div>
                        <p className={styles["tax-info-value"]}>$20</p>
                    </div>
                </div>
            </div>

            <div className={styles["cancellation-info-block"] + " " + styles["booking-side-block"]}>
                <p className={styles["cancellation-header"]}>Яка вартість скасування?</p>
                <p className={styles["cancellation-message"]}>Безкоштовно скасування до {formattedDayBeforeBooking}</p>

                <div className={styles["cancellation-date-price"] + " " + styles["sides-container"]}>
                    <p>З 00:00, {formattedDayBeforeBooking}</p>
                    <p>${Math.floor(sumDiscountPrice)}</p>
                </div>
            </div>
        </div>
    );
};

export default BookingSidePanel;