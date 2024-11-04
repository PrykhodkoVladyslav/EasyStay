import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";
import HorizontalLine from "components/ui/design/HorizontalLine.tsx";
import InfoInput from "components/ui/design/InfoInput.tsx";
import { IBookingBedSelection, IRoomVariantWithRoom } from "pages/customer/BookingPage/BookingPage.tsx";
import IHotelAmenity from "interfaces/hotelAmenity/IHotelAmenity.ts";
import { User } from "interfaces/user";
import { useEffect, useState } from "react";
import BedInfoBlock
    from "components/partials/customer/BookingPersonalData/BookingInfoBlock/BedInfoBlock/BedInfoBlock.tsx";

interface IBookingInfoBlockProps {
    roomName: string;
    roomVariantInfos: IRoomVariantWithRoom[];
    hotelAmenities: IHotelAmenity[];
    user: User;
}

const BookingInfoBlock = (props: IBookingInfoBlockProps) => {
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

    return <div className="booking-data-block">
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

        <InfoInput title="Ім'я та прізвище" value={`${props.user.firstName} ${props.user.lastName}`} />

        <HorizontalLine />

        <BedInfoBlock selectedBeds={selectedBeds} />
    </div>;
};

export default BookingInfoBlock;