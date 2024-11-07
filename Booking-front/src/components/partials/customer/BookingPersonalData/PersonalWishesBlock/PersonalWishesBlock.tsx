import { getPublicResourceUrl } from "utils/publicAccessor.ts";

interface IPersonalWishesBlockProps {
    personalWishes: string;
    setPersonalWishes: (personalWishes: string) => void;
    isRoomsNextToEachOther: boolean;
    setIsRoomsNextToEachOther: (isRoomsNextToEachOther: boolean) => void;
}

const PersonalWishesBlock = (props: IPersonalWishesBlockProps) => {
    const { personalWishes, setPersonalWishes, isRoomsNextToEachOther, setIsRoomsNextToEachOther } = props;

    return <div className="personal-wishes-block">
        <h3 className="title">У вас є особисті побажання?</h3>
        <p className="description">Виконання ваших особливих побажань не гарантоване, але адміністрація зробить усе
            можливе, щоб їх врахувати.
            Після завершення бронювання ви можете надіслати запит або висловити свої побажання!</p>

        <p className="input-title">Будь ласка, напишіть свій запит англійською</p>
        <div className="personal-wishes-input">
            <textarea
                value={personalWishes}
                onChange={e => setPersonalWishes(e.target.value)}
                placeholder="Текст"
                maxLength={4000}
            />
            <p className="counter">{personalWishes.length}/4000</p>
        </div>

        <div className="personal-wishes-radio pointer"
             onClick={() => setIsRoomsNextToEachOther(!isRoomsNextToEachOther)}>
            <img
                src={getPublicResourceUrl(`icons/radiobutton/${isRoomsNextToEachOther ? "checked" : "unchecked"}-black.svg`)}
                alt="radio" />
            <p>Я хочу, щоб номери були поряд</p>
        </div>
    </div>;
};

export default PersonalWishesBlock;