import DatePickerModal from "components/partials/customer/DatePickerModal.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";

import React, { useState } from "react";

const SearchTopSection = () => {
    const [guests, setGuests] = useState(1);

    const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length <= 1 && /^\d*$/.test(value)) {
            setGuests(+value);
        }
    };

    return (
        <div className="search-top-section">
            <div className="block city-block">
                <p className="title">Куди</p>
                <input type="text" className="city-input" placeholder="Введіть назву міста" />
            </div>
            <div className="block middle-block">
                <div className="title-container">
                    <img
                        className="icon-padding"
                        src={getPublicResourceUrl("icons/calendar.svg")}
                        alt="Magnifying glass"
                    />
                    <p className="title">Прибуття</p>
                </div>

                <p className="date">
                    5 жовтня <span>2024</span>
                </p>
            </div>
            <div className="block middle-block">
                <div className="title-container">
                    <img
                        className="icon-padding"
                        src={getPublicResourceUrl("icons/calendar.svg")}
                        alt="Magnifying glass"
                    />
                    <p className="title">Виїзд</p>
                </div>

                <p className="date">
                    7 жовтня <span>2024</span>
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

            <DatePickerModal />
        </div>
    );
};

export default SearchTopSection;
