import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import InfoInput from "components/ui/design/InfoInput.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { getUser } from "store/slice/userSlice.ts";
import { useSelector } from "react-redux";
import { IBookingBedSelection, IRoomVariantWithRoom } from "pages/customer/BookingPage.tsx";
import IHotelAmenity from "interfaces/hotelAmenity/IHotelAmenity.ts";
import HorizontalLine from "components/ui/design/HorizontalLine.tsx";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";
import { useEffect, useState } from "react";

interface IBookingPersonalDataProps {
    roomName: string;
    roomVariantInfos: IRoomVariantWithRoom[];
    hotelAmenities: IHotelAmenity[];

    onNext: () => void;
}

const BookingPersonalData = (props: IBookingPersonalDataProps) => {
    const user = useSelector(getUser);
    if (!user)
        throw new Error("User is not authorized");

    const adults = props.roomVariantInfos
        .map(rv => rv.roomVariant.guestInfo.adultCount * rv.quantity)
        .reduce((prev, curr) => prev + curr, 0);

    const children = props.roomVariantInfos
        .map(rv => rv.roomVariant.guestInfo.childCount * rv.quantity)
        .reduce((prev, curr) => prev + curr, 0);

    const guessArray: string[] = [];
    if (adults > 0)
        guessArray.push(`${adults} дорослих`);

    if (children > 0)
        guessArray.push(`${children} дітей`);

    const guessInfo = guessArray.join(", ");

    const [selectedBeds, setSelectedBeds] = useState<IBookingBedSelection>({});

    useEffect(() => {
        const result = props.roomVariantInfos
            .map(rv => rv.bookingBedSelection)
            .reduce((prev, curr) => ({
                isSingleBed: prev.isSingleBed || curr.isSingleBed,
                isDoubleBed: prev.isDoubleBed || curr.isDoubleBed,
                isExtraBed: prev.isExtraBed || curr.isExtraBed,
                isSofa: prev.isSofa || curr.isSofa,
                isKingsizeBed: prev.isKingsizeBed || curr.isKingsizeBed,
            }), {});

        setSelectedBeds(result);
    }, [props.roomVariantInfos]);

    return <div className="personal-data-container">
        <div className="message-container">
            <img src={getPublicResourceUrl("/icons/info/info.svg")} alt="info" />
            <div>
                <p>Майже готово! Залишилося заповнити <span className="red-text">*</span> обов'язкові поля.</p>
                <p>Будь ласка, введіть усі дані латинкою, щоб в адміністрації помешкання змогли їх зрозуміти.</p>
            </div>
        </div>

        <div className="personal-data-block">
            <h3 className="personal-data-title">Ваші дані</h3>

            <VerticalPad heightPx={24} />

            <div className="personal-data-rows">
                <div className="personal-data-columns">
                    <InfoInput title="Ім'я" value={user.firstName} />
                    <InfoInput title="Прізвище" value={user.lastName} />
                </div>
                <InfoInput title="Email" value={user.email} />
            </div>
        </div>

        <div className="booking-data-block">
            <h3 className="room-name">{props.roomName}</h3>

            <div className="info-block">
                <div className="info-item">
                    <img src={getPublicResourceUrl("icons/dot/dot.svg")} alt="question" />
                    <p className="info-item-message">Вартість не повертаться</p>
                    <img src={getPublicResourceUrl("icons/question/question.svg")} alt="question" />
                </div>

                <div className="guess-info">
                    <img src={getPublicResourceUrl("icons/guess.svg")} alt="guess" />
                    <p className="info-item-message">
                        <span>Гості:</span>{guessInfo}
                    </p>
                    <img src={getPublicResourceUrl("icons/question/question.svg")} alt="question" />
                </div>
            </div>

            <div className="hotel-amenities">
                {props.hotelAmenities.map(ha => (<div key={ha.id} className="hotel-amenity">
                    <img className="amenity-image" src={getApiImageUrl(ha.image, 200)} alt="icon" />
                    <p className="amenity-name">{ha.name}</p>
                </div>))}
            </div>

            <HorizontalLine />

            <InfoInput title="Ім'я та прізвище" value={`${user.firstName} ${user.lastName}`} />

            <HorizontalLine />

            <div className="bed-info-block">
                <p className="bed-info-title">Обраний тип ліжка</p>

                <div className="bed-infos">
                    {selectedBeds.isSingleBed && <div className="bed-info">
                        <p>односпальне ліжко</p>
                        <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
                    </div>}
                    {selectedBeds.isDoubleBed && <div className="bed-info">
                        <p>двоспальне ліжко</p>
                        <img src={getPublicResourceUrl("icons/roomSvg/double-bed.svg")} alt="bed-icon" />
                    </div>}
                    {selectedBeds.isExtraBed && <div className="bed-info">
                        <p>диван</p>
                        <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
                    </div>}
                    {selectedBeds.isSofa && <div className="bed-info">
                        <p>додаткове ліжко</p>
                        <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
                    </div>}
                    {selectedBeds.isKingsizeBed && <div className="bed-info">
                        <p>кінгсайз ліжко</p>
                        <img src={getPublicResourceUrl("icons/roomSvg/single-bed.svg")} alt="bed-icon" />
                    </div>}
                </div>
            </div>
        </div>
    </div>;
};

export default BookingPersonalData;