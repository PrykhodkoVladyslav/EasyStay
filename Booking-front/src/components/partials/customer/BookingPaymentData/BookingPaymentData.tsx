import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { useState } from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { uk } from "date-fns/locale";

interface IBookingPaymentDataProps {
    dateFrom: Date;
}

const BookingPaymentData = (props: IBookingPaymentDataProps) => {
    const { dateFrom } = props;

    const [activeOption, setActiveOption] = useState<number | null>(null);

    const dayBefore = addDays(dateFrom, -1);
    const formattedDayBefore = format(dayBefore, "d MMM yyyy", { locale: uk });

    const threeDaysBefore = addDays(dateFrom, -3);
    const formattedThreeDaysBefore = format(threeDaysBefore, "d MMM yyyy", { locale: uk });

    return <div className="payment-data-container">
        <div className="payment-method-container">
            <div className="payment-title-container">
                <h3 className="payment-title">Коли ви хочете оплатити?</h3>

                <div className="payment-question-container">
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

            <div>

            </div>
        </>}
    </div>;
};

export default BookingPaymentData;