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

interface ISearchTopSectionProps {
    onSearch?: () => void;
    hideCityInput?: boolean;

    city: string;
    setCity: (city: string) => void;
    selectedDateFrom: Date | null;
    selectedDateTo: Date | null;
    setSelectedDateFrom: (date: Date | null) => void;
    setSelectedDateTo: (date: Date | null) => void;
    adultGuests: number;
    setAdultGuests: (guests: number) => void;
}

const SearchHotelSection = (props: ISearchTopSectionProps) => {
    const {
        city,
        setCity,
        selectedDateFrom,
        selectedDateTo,
        setSelectedDateFrom,
        setSelectedDateTo,
        adultGuests,
        setAdultGuests,
    } = props;

    const [isOpenedDatePicker, setIsOpenedDatePicker] = useState(false);

    const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length <= 1 && /^\d*$/.test(value)) {
            setAdultGuests(+value);
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

    const onSearchClick = () => props.onSearch?.();

    return (
        <div className="search-top-section">
            {!props.hideCityInput && (
                <div className="block city-block">
                    <p className="title">Куди</p>
                    <input type="text" className="city-input" placeholder="Назва міста"
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                    />
                </div>
            )}
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
                        value={adultGuests}
                        onChange={handleGuestsChange}
                    />
                    <p className="guests-title">Дорослих</p>
                </div>
            </div>
            <div className="find-block">
                <button className="find-button" onClick={onSearchClick}>
                    <img src={getPublicResourceUrl("icons/magnifying-glass.svg")} alt="Magnifying glass" />
                    <p className="button-title">Шукати</p>
                </button>
            </div>

            <DatePickerModal onSelectionChange={onSelectionChange} isOpen={isOpenedDatePicker}
                             onClose={() => setIsOpenedDatePicker(false)} />
        </div>
    );
};

export default SearchHotelSection;
