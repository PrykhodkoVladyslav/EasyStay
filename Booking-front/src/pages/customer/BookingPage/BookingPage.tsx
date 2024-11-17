import { useNavigate, useParams } from "react-router-dom";
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
import { addMinutes, format } from "date-fns";
import showToast from "utils/toastShow.ts";
import { useCreateBankCardMutation } from "services/bankCard.ts";
import ICreateBankCardRequest from "interfaces/bankCard/ICreateBankCardRequest.ts";
import ICreateBookingRequest from "interfaces/booking/ICreateBookingRequest.ts";
import { useCreateBookingMutation } from "services/booking.ts";
import IValidationError from "interfaces/error/IValidationError.ts";
import { instantScrollToTop } from "utils/scrollToTop.ts";

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
    useEffect(instantScrollToTop, []);

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

    const [activeOption, setActiveOption] = useState<number | null>(null);
    const [holderName, setHolderName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expiryDate, setExpiryDate] = useState<string>("");
    const [cvc, setCvc] = useState<string>("");
    const [isSaveCard, setIsSaveCard] = useState<boolean>(false);
    const [isAppliedAgreements, setIsAppliedAgreements] = useState<boolean>(false);

    const [createBankCard] = useCreateBankCardMutation();
    const [createBooking] = useCreateBookingMutation();

    const navigate = useNavigate();

    const onlyDigitsRegExp = /^\d+$/;

    const setSafeCardNumber = (value: string) => {
        if (value.match(onlyDigitsRegExp) || value.length === 0)
            setCardNumber(value);
    };

    const setSafeExpiryDate = (value: string) => {
        if (
            value.match(/^\d$/) ||
            value.match(/^\d{2}$/) ||
            value.match(/^\d{2}\/$/) ||
            value.match(/^\d{2}\/\d$/) ||
            value.match(/^\d{2}\/\d{2}$/) ||
            value.length === 0
        )
            setExpiryDate(value);
    };

    const setSafeCvc = (value: string) => {
        if (value.match(onlyDigitsRegExp) || value.length === 0)
            setCvc(value);
    };

    const createBookingRequestInstance = () => {
        const { bookingInfo } = externalBookingInfo;

        const [hours, minutes] = selectedTime.split(":");

        const localTime = new Date(0, 0, 0, parseInt(hours), parseInt(minutes), 0, 0);
        const utcTime = addMinutes(localTime, localTime.getTimezoneOffset());

        return {
            dateFrom: bookingInfo.dateFrom,
            dateTo: bookingInfo.dateTo,
            personalWishes: personalWishes || undefined,
            estimatedTimeOfArrivalUtc: utcTime,
            bookingRoomVariants: bookingInfo.bookingRoomVariants
                .map(brv => brv as IBookingRoomVariant),
        } as ICreateBookingRequest;
    };

    const submitBookingInfo = () => {
        if (selectedTime === "") {
            showToast("Оберіть орієнтований час прибуття", "warning");
            return;
        }

        setBodyIndex(2);
    };

    const submitPaymentInfo = async () => {
        if (activeOption == null) {
            showToast("Оберіть спосіб оплати", "warning");
            return;
        }

        if (!isAppliedAgreements) {
            showToast("Прийміть умови політики конфіденційності", "warning");
            return;
        }

        const createBookingRequest = createBookingRequestInstance();

        if (activeOption === 0 || activeOption === 1) {
            if (!holderName) {
                showToast("Введіть повне ім'я власника банківської карти", "warning");
                return;
            }

            if (cardNumber.length !== 16) {
                showToast("Введіть номер картки", "warning");
                return;
            }

            if (expiryDate.length !== 5) {
                showToast("Введіть термін дії картки", "warning");
                return;
            }

            if (cvc.length !== 3) {
                showToast("Введіть CVC код", "warning");
                return;
            }

            const [month, year] = expiryDate.split("/");

            const createCardRequest = {
                ownerFullName: holderName,
                number: cardNumber,
                cvv: cvc,
                expirationDate: `20${year.padStart(2, "0")}-${month.padStart(2, "0")}-01`,
            } as ICreateBankCardRequest;

            if (isSaveCard) {
                try {
                    createBookingRequest.bankCardId = await createBankCard(createCardRequest).unwrap();
                } catch (error) {
                    showToast("Некоректні дані картки", "error");
                    return;
                }
            } else {
                createBookingRequest.bankCard = createCardRequest;
            }
        }

        try {
            await createBooking(createBookingRequest).unwrap();

            navigate("/");
        } catch (error) {
            const e = error as IValidationError;
            if (e.data[0].PropertyName === "BankCard") {
                showToast("Некоректні дані картки", "error");
                return;
            }

            showToast("Помилка бронювання", "error");
        }
    };

    const onNext = async () => {
        if (bodyIndex === 1) {
            submitBookingInfo();
        } else if (bodyIndex === 2) {
            await submitPaymentInfo();
        }
    };

    return <div className="booking-page-main-container">
        <StageIndicator options={["Ваш вибір", "Ваші дані", "Завершальний крок"]} currentOptionIndex={bodyIndex} />

        <VerticalPad heightPx={46} />

        {hotel && <div className="booking-info-container">
            <BookingSidePanel
                hotelId={externalBookingInfo.hotelId}
                selectedRoomVariants={selectedRoomVariants}
                dateFrom={externalBookingInfo.bookingInfo.dateFrom}
                dateTo={externalBookingInfo.bookingInfo.dateTo}
                arrivalTimeUtcFrom={hotel.arrivalTimeUtcFrom}
                departureTimeUtcFrom={hotel.departureTimeUtcFrom}
            />
            <div className="center-block">
                {bodyIndex === 1
                    ? <BookingPersonalData
                        roomName={selectedRoom?.name ?? ""}
                        roomVariantInfos={selectedRoomVariants}
                        hotelAmenities={hotel.hotelAmenities}
                        personalWishes={personalWishes}
                        setPersonalWishes={setPersonalWishes}
                        isRoomsNextToEachOther={isRoomsNextToEachOther}
                        setIsRoomsNextToEachOther={setIsRoomsNextToEachOther}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        arrivalTime={formatTime(hotel.arrivalTimeUtcFrom)}
                        onNext={onNext}
                    />
                    : bodyIndex === 2
                        ? <BookingPaymentData
                            dateFrom={externalBookingInfo.bookingInfo.dateFrom}
                            activeOption={activeOption}
                            setActiveOption={setActiveOption}
                            holderName={holderName}
                            setHolderName={setHolderName}
                            cardNumber={cardNumber}
                            setCardNumber={setSafeCardNumber}
                            expiryDate={expiryDate}
                            setExpiryDate={setSafeExpiryDate}
                            cvc={cvc}
                            setCvc={setSafeCvc}
                            isSaveCard={isSaveCard}
                            setIsSaveCard={setIsSaveCard}
                            isAppliedAgreements={isAppliedAgreements}
                            setIsAppliedAgreements={setIsAppliedAgreements}
                            onNext={onNext}
                        />
                        : null}
            </div>
        </div>}

        <VerticalPad heightPx={40} />
    </div>;
};

export default BookingPage;