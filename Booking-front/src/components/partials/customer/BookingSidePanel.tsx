import "./../../../css/booking-side-panel.scss";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export interface IBookingSidePanelProps {
    hotelId: number;

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

    return (
        <div className="booking-side-panel">
            <div className="booking-info-block">
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
                        <p className="total-time-value">{2} ночі</p>
                    </div>
                </div>

                <div className="vertical-separator" />

                <button className="change-selection-button" onClick={() => navigate(`/hotel/${props.hotelId}`)}>
                    Змінити вибір
                </button>
            </div>
        </div>
    );
};

export default BookingSidePanel;