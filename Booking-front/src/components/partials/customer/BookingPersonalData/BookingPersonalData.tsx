import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { getUser } from "store/slice/userSlice.ts";
import { useSelector } from "react-redux";
import { IRoomVariantWithRoom } from "pages/customer/BookingPage/BookingPage.tsx";
import IHotelAmenity from "interfaces/hotelAmenity/IHotelAmenity.ts";
import BookingInfoBlock from "components/partials/customer/BookingPersonalData/BookingInfoBlock/BookingInfoBlock.tsx";
import PersonalDataBlock
    from "components/partials/customer/BookingPersonalData/PersonalDataBlock/PersonalDataBlock.tsx";
import PersonalWishesBlock
    from "components/partials/customer/BookingPersonalData/PersonalWishesBlock/PersonalWishesBlock.tsx";

interface IBookingPersonalDataProps {
    roomName: string;
    roomVariantInfos: IRoomVariantWithRoom[];
    hotelAmenities: IHotelAmenity[];

    personalWishes: string;
    setPersonalWishes: (personalWishes: string) => void;
    isRoomsNextToEachOther: boolean;
    setIsRoomsNextToEachOther: (isRoomsNextToEachOther: boolean) => void;
    selectedTime: string;
    setSelectedTime: (time: string) => void;

    arrivalTime: string;

    openRulesModal?: () => void;

    onNext: () => void;
}

const BookingPersonalData = (props: IBookingPersonalDataProps) => {
    const {
        personalWishes,
        setPersonalWishes,
        isRoomsNextToEachOther,
        setIsRoomsNextToEachOther,
        selectedTime,
        setSelectedTime,
        arrivalTime,
        openRulesModal,
        onNext,
    } = props;

    const user = useSelector(getUser);
    if (!user)
        throw new Error("User is not authorized");


    const times: string[] = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            times.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
        }
    }

    return <div className="personal-data-container">
        <div className="message-container">
            <img src={getPublicResourceUrl("/icons/info/info.svg")} alt="info" />
            <div>
                <p>Майже готово! Залишилося заповнити <span className="red-text">*</span> обов'язкові поля.</p>
                <p>Будь ласка, введіть усі дані латинкою, щоб в адміністрації помешкання змогли їх зрозуміти.</p>
            </div>
        </div>

        <PersonalDataBlock user={user} />

        <BookingInfoBlock
            roomName={props.roomName}
            roomVariantInfos={props.roomVariantInfos}
            hotelAmenities={props.hotelAmenities}
            user={user}
        />

        <PersonalWishesBlock
            personalWishes={personalWishes}
            setPersonalWishes={setPersonalWishes}
            isRoomsNextToEachOther={isRoomsNextToEachOther}
            setIsRoomsNextToEachOther={setIsRoomsNextToEachOther}
        />

        <div className="submit-block">
            <div className="time-section">
                <p className="time-section-title">Ваш час прибуття</p>

                <div className="arrival-time">
                    <img src={getPublicResourceUrl("icons/circleCheckMark.svg")} alt="check" />
                    <p>Ваш номер буде готовий до заїзду о {arrivalTime}</p>
                </div>

                <div className="customers-arrival-time-container">
                    <div className="arrival-time-input-container">
                        <p className="title">Додайте орієнтовний час свого прибуття</p>
                        <select className="pointer" value={selectedTime}
                                onChange={e => setSelectedTime(e.target.value)}>
                            <option value="" className="default-option">
                                Виберіть
                            </option>
                            {times.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="message-under-time">За часом у місті Луцьк</p>
                </div>
            </div>
            <div className="submit-section">
                <button className="submit-button" onClick={onNext}>Далі: останні дані</button>
                <p className="booking-conditions pointer" onClick={openRulesModal}>Які умови мого бронювання?</p>
            </div>
        </div>
    </div>;
};

export default BookingPersonalData;