import { useParams } from "react-router-dom";
import "./booking-page.scss";
import StageIndicator from "components/partials/customer/StageIndicator.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { useGetHotelQuery } from "services/hotel.ts";
import BookingSidePanel from "components/partials/customer/BookingSidePanel/BookingSidePanel.tsx";
import IRoomVariant from "interfaces/roomVariant/IRoomVariant.ts";
import { useEffect, useState } from "react";
import BookingPersonalData from "components/partials/customer/BookingPersonalData/BookingPersonalData.tsx";
import BookingPaymentData from "components/partials/customer/BookingPaymentData/BookingPaymentData.tsx";
import IRoom from "interfaces/room/IRoom.ts";
import { format } from "date-fns";
import showToast from "utils/toastShow.ts";

export interface IBookingBedSelection {
    isSingleBed?: boolean;
    isDoubleBed?: boolean;
    isExtraBed?: boolean;
    isSofa?: boolean;
    isKingsizeBed?: boolean;
}

export interface IBookingRoomVariant {
    roomVariantId: number;
    quantity: number;
    bookingBedSelection: IBookingBedSelection;
}

export interface IBookingPageExternalInformation {
    hotelId: number;

    bookingInfo: {
        dateFrom: Date;
        dateTo: Date;
        bookingRoomVariants: IBookingRoomVariant[];
    };
}

export interface IRoomVariantWithRoom {
    roomVariant: IRoomVariant;
    quantity: number;
    bookingBedSelection: IBookingBedSelection;
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

    const [selectedRoomVariants, setSelectedRoomVariants] = useState<IRoomVariantWithRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);

    const { data: hotel } = useGetHotelQuery(externalBookingInfo.hotelId);

    useEffect(() => {
        const selectedRoomVariantIds = externalBookingInfo.bookingInfo.bookingRoomVariants
            .map(brv => ({
                roomVariantId: brv.roomVariantId,
                quantity: brv.quantity,
                bookingBedSelection: brv.bookingBedSelection,
            }) as IBookingRoomVariant);

        setSelectedRoomVariants(hotel?.rooms
            ?.map(r => r.variants)
            ?.flat()
            ?.filter(
                rv => selectedRoomVariantIds
                    .map(r => r.roomVariantId)
                    .includes(rv.id),
            )
            ?.map(r => {
                const rv = selectedRoomVariantIds
                    .find(s => s.roomVariantId === r.id);

                if (!rv)
                    throw new Error("Room variant not found");

                return {
                    roomVariant: r,
                    quantity: rv.quantity,
                    bookingBedSelection: rv.bookingBedSelection,
                } as unknown as IRoomVariantWithRoom;
            }) ?? []);

        setSelectedRoom(hotel?.rooms?.find(r => r.variants.find(rv => rv.id === selectedRoomVariantIds[0].roomVariantId)) ?? null);
    }, [externalBookingInfo.bookingInfo.bookingRoomVariants, hotel]);

    const [bodyIndex, setBodyIndex] = useState(1);

    const [personalWishes, setPersonalWishes] = useState("");
    const [isRoomsNextToEachOther, setIsRoomsNextToEachOther] = useState(false);

    const timeFromString = (time: string) => new Date(`0001-01-01T${time}Z`);
    const formatTime = (time: string) => format(timeFromString(time), "HH:mm");

    const [selectedTime, setSelectedTime] = useState<string>("");

    return <div className="booking-page-main-container">
        <StageIndicator options={["Ваш вибір", "Ваші дані", "Завершальний крок"]} currentOptionIndex={bodyIndex} />

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
                {bodyIndex === 1
                    ? <BookingPersonalData
                        roomName={selectedRoom?.name ?? ""}
                        roomVariantInfos={selectedRoomVariants}
                        hotelAmenities={hotel?.hotelAmenities ?? []}
                        personalWishes={personalWishes}
                        setPersonalWishes={setPersonalWishes}
                        isRoomsNextToEachOther={isRoomsNextToEachOther}
                        setIsRoomsNextToEachOther={setIsRoomsNextToEachOther}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        arrivalTime={formatTime(hotel?.arrivalTimeUtcFrom ?? "00:00:00")}
                        onNext={() => {
                            if (selectedTime === "") {
                                showToast(`Оберіть орієнтований час прибуття`, "error");
                                return;
                            }

                            setBodyIndex(2);
                        }}
                    />
                    : bodyIndex === 2
                        ? <BookingPaymentData />
                        : null}
            </div>
        </div>

        <VerticalPad heightPx={40} />
    </div>;
};

export default BookingPage;