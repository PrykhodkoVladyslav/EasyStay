import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { useEffect, useState } from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { uk } from "date-fns/locale";
import "./../../../../css/bank-card-info-container.scss";
import WithoutBankCardModal from "components/partials/customer/WithoutBankCardModal/WithoutBankCardModal.tsx";

interface IBookingPaymentDataProps {
    dateFrom: Date;
    activeOption: number | null;
    setActiveOption: (option: number | null) => void;
    holderName: string;
    setHolderName: (value: string) => void;
    cardNumber: string;
    setCardNumber: (value: string) => void;
    expiryDate: string;
    setExpiryDate: (value: string) => void;
    cvc: string;
    setCvc: (value: string) => void;
    isSaveCard: boolean;
    setIsSaveCard: (value: boolean) => void;
    isAppliedAgreements: boolean;
    setIsAppliedAgreements: (value: boolean) => void;

    openRulesModal?: () => void;

    onNext: () => void;
}

const BookingPaymentData = (props: IBookingPaymentDataProps) => {
    const {
        dateFrom,
        activeOption,
        setActiveOption,
        holderName,
        setHolderName,
        cardNumber,
        setCardNumber,
        expiryDate,
        setExpiryDate,
        cvc,
        setCvc,
        isSaveCard,
        setIsSaveCard,
        isAppliedAgreements,
        setIsAppliedAgreements,
        openRulesModal,
        onNext,
    } = props;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const dayBefore = addDays(dateFrom, -1);
    const formattedDayBefore = format(dayBefore, "d MMM yyyy", { locale: uk });

    const threeDaysBefore = addDays(dateFrom, -3);
    const formattedThreeDaysBefore = format(threeDaysBefore, "d MMM yyyy", { locale: uk });

    const [isOpenWithoutBankCardModal, setIsOpenWithoutBankCardModal] = useState(false);

    return <div className="payment-data-container">
        <WithoutBankCardModal isOpen={isOpenWithoutBankCardModal} setIsOpen={setIsOpenWithoutBankCardModal} />

        <div className="payment-method-container">
            <div className="payment-title-container">
                <h3 className="payment-title">Коли ви хочете оплатити?</h3>

                <div className="payment-question-container pointer" onClick={() => setIsOpenWithoutBankCardModal(true)}>
                    <img src={getPublicResourceUrl("icons/question/gray-question.svg")} alt="question" />
                    <p>Немає картки?</p>
                </div>
            </div>

            <VerticalPad heightPx={24} />

            <div className="payment-options-container">
                <div className="payment-option-container pointer" onClick={() => setActiveOption(0)}>
                    <img
                        src={getPublicResourceUrl(`icons/radiobutton/${activeOption === 0 ? "checked" : "unchecked"}-gray.svg`)}
                        alt="checkbox-icon"
                    />
                    <div>
                        <p className="payment-option-title">Оплатити зараз</p>
                        <p className="payment-method-description">Ви заплатите через EasyStay після завершення
                            бронювання. Ви можете скасувати до {formattedDayBefore} й отримати повне повернення
                            коштів.</p>
                    </div>
                </div>
                {differenceInCalendarDays(threeDaysBefore, new Date()) > 3
                    && <div className="payment-option-container pointer" onClick={() => setActiveOption(1)}>
                        <img
                            src={getPublicResourceUrl(`icons/radiobutton/${activeOption === 1 ? "checked" : "unchecked"}-gray.svg`)}
                            alt="checkbox-icon"
                        />
                        <div>
                            <p className="payment-option-title">{formattedThreeDaysBefore}</p>
                            <p className="payment-method-description">EasyStay опрацює вашу оплату. Ми автоматично
                                стягнемо оплату з вибраної картки {formattedThreeDaysBefore}.</p>
                        </div>
                    </div>}
                <div className="payment-option-container pointer" onClick={() => setActiveOption(2)}>
                    <img
                        src={getPublicResourceUrl(`icons/radiobutton/${activeOption === 2 ? "checked" : "unchecked"}-gray.svg`)}
                        alt="checkbox-icon"
                    />
                    <div>
                        <p className="payment-option-title">Оплачуйте в помешканні</p>
                        <p className="payment-method-description">Оплата з картки не стягуватиметься. Дані вашої картки
                            потрібні лише для гарантії бронювання.</p>
                    </div>
                </div>
            </div>
        </div>

        {(activeOption === 0 || activeOption === 1) && <>
            <VerticalPad heightPx={40} />

            <div className="bank-card-info-container">
                <div className="input-container">
                    <p className="input-title">Імʼя власника картки <sup>*</sup></p>
                    <input className="input-input"
                           placeholder="Іваненко Іван Іванович"
                           type="text"
                           value={holderName}
                           onChange={e => setHolderName(e.target.value)}
                           maxLength={100}
                    />
                </div>

                <div className="input-container">
                    <p className="input-title">Номер картки <sup>*</sup></p>
                    <input className="input-input"
                           placeholder="5555555555554444"
                           type="text"
                           value={cardNumber}
                           onChange={e => setCardNumber(e.target.value)}
                           maxLength={16}
                    />
                </div>

                <div className="left-right-part">
                    <div className="input-container">
                        <p className="input-title">Термін дії <sup>*</sup></p>
                        <input className="input-input"
                               placeholder="01/26"
                               type="text"
                               value={expiryDate}
                               onChange={e => setExpiryDate(e.target.value)}
                               maxLength={5}
                        />
                    </div>

                    <div className="input-container">
                        <div className="on-sides">
                            <p className="input-title">CVC - код <sup>*</sup></p>
                            <img className="pointer" src={getPublicResourceUrl("icons/question/gray-question.svg")}
                                 alt="question" />
                        </div>
                        <input className="input-input"
                               placeholder="000"
                               type="text"
                               value={cvc}
                               onChange={e => setCvc(e.target.value)}
                               maxLength={3}
                        />
                    </div>
                </div>

                <div className="save-card-container">
                    <div
                        className={`tweaker ${isSaveCard ? "tweaker-enabled" : "tweaker-disabled"} pointer`}
                        onClick={() => setIsSaveCard(!isSaveCard)}
                    >
                        <div />
                    </div>

                    <p>Зберегти картку для майбутніх платежів</p>
                </div>
            </div>
        </>}

        <VerticalPad heightPx={100} />

        <div className="submit-container">
            <div className="agreements-container">
                <div className="agreement-options-container">
                    <div className="agreement-option-container pointer"
                         onClick={() => setIsAppliedAgreements(!isAppliedAgreements)}>
                        <img
                            src={getPublicResourceUrl(`icons/radiobutton/${isAppliedAgreements ? "checked" : "unchecked"}-gray.svg`)}
                            alt="checkbox-icon"
                        />
                        <p className="agreement-description">Я погоджуюсь з умовами політики конфіденційності EasyStay,
                            надаючи згоду на обробку моїх персональних даних з метою забезпечення належного
                            функціонування сервісу, покращення користувацького досвіду, а також надання персоналізованих
                            рекомендацій.</p>
                    </div>
                </div>

                <p className="personal-offers-description">Зареєструвавшись, ви дозволяєте нам підбирати пропозиції та
                    вміст відповідно до ваших інтересів,
                    відстежуючи, як ви використовуєте EasyStay за допомогою технологій відстеження. Ознайомтеся з нашою
                    політикою конфіденційності.</p>
            </div>

            <div className="submit-container">
                <button className="payment-submit-button" onClick={onNext}>Забронювати з зобовʼязанням оплатити</button>

                <p className="booking-conditions-description pointer" onClick={openRulesModal}>Які умови мого
                    бронювання?</p>
            </div>
        </div>
    </div>;
};

export default BookingPaymentData;