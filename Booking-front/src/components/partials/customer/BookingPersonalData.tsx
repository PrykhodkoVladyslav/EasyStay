import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import InfoInput from "components/ui/design/InfoInput.tsx";
import VerticalPad from "components/ui/VerticalPad.tsx";
import { getUser } from "store/slice/userSlice.ts";
import { useSelector } from "react-redux";

interface IBookingPersonalDataProps {
    onNext: () => void;
}

const BookingPersonalData = (props: IBookingPersonalDataProps) => {
    const user = useSelector(getUser);
    if (!user)
        throw new Error("User is not authorized");

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
    </div>;
};

export default BookingPersonalData;