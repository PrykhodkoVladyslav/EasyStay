import DatePickerModal from "components/partials/customer/DatePickerModal.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

import React, { useState } from "react";

const nameOfMonthsInGenitiveCase: Record<number, string> = {
    0: "січня",
    1: "лютого",
    2: "березня",
    3: "квітня",
    4: "травня",
    5: "червня",
    6: "липня",
    7: "серпня",
    8: "вересня",
    9: "жовтня",
    10: "листопада",
    11: "грудня",
};

const SearchTopSection = () => {
    const [guests, setGuests] = useState(1);
    const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(null);
    const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(null);
    const [isOpenedDatePicker, setIsOpenedDatePicker] = useState(false);

    const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length <= 1 && /^\d*$/.test(value)) {
            setGuests(+value);
        }
    };

    const onSelectionChange = (from: Date | null, to: Date | null) => {
        setSelectedDateFrom(from);
        setSelectedDateTo(to);
    };

    const getFormattedDate = (date: Date) => {
        return `${date.getDate()} ${nameOfMonthsInGenitiveCase[date.getMonth()]}`;
    };
    const getYear = (date: Date) => {
        return date.getFullYear();
    };

    const isSelectedDates = () => selectedDateFrom !== null && selectedDateTo !== null;

    console.log(isOpenedDatePicker);

    return (
        <div className="search-top-section">
            <div className="block city-block">
                <p className="title">Куди</p>
                <input type="text" className="city-input" placeholder="Введіть назву міста" />
            </div>
            <div className="block middle-block date-block" onClick={() => setIsOpenedDatePicker(true)}>
                <div className="title-container">
                    <img
                        className="icon-padding"
                        src={getPublicResourceUrl("icons/calendar.svg")}
                        alt="Magnifying glass"
                    />
                    <p className="title">Прибуття</p>
                </div>

                <p className="date">
                    {isSelectedDates()
                        ? <>
                            {getFormattedDate(selectedDateFrom ?? new Date())}
                            <span> {getYear(selectedDateFrom ?? new Date())}</span>
                        </>
                        : <span>Не обрано</span>}
                </p>
            </div>
            <div className="block middle-block date-block" onClick={() => setIsOpenedDatePicker(true)}>
                <div className="title-container">
                    <img
                        className="icon-padding"
                        src={getPublicResourceUrl("icons/calendar.svg")}
                        alt="Magnifying glass"
                    />
                    <p className="title">Виїзд</p>
                </div>

                <p className="date">
                    {isSelectedDates()
                        ? <>
                            {getFormattedDate(selectedDateTo ?? new Date())}
                            <span> {getYear(selectedDateTo ?? new Date())}</span>
                        </>
                        : <span>Не обрано</span>}

                </p>
            </div>
            <div className="block middle-block">
                <div className="title-container">
                    <p className="title">Кількість гостей</p>
                </div>
                <div className="guests">
                    <img className="guests-icon" src={getPublicResourceUrl("icons/adult.svg")} alt="Adult" />
                    <input
                        className="guests-input"
                        type="number"
                        value={guests}
                        onChange={handleGuestsChange}
                    />
                    <p className="guests-title">Дорослих</p>
                </div>
            </div>
            <div className="find-block">
                <button className="find-button">
                    <img src={getPublicResourceUrl("icons/magnifying-glass.svg")} alt="Magnifying glass" />
                    <p className="button-title">Шукати</p>
                </button>
            </div>

            <DatePickerModal onSelectionChange={onSelectionChange} isOpen={isOpenedDatePicker}
                             onClose={() => setIsOpenedDatePicker(false)} />
        </div>
    );
};

export default SearchTopSection;
