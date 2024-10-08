import React, { useState } from 'react';

const SearchForm: React.FC = () => {
    const [destination, setDestination] = useState<string>('Житомир');
    const [arrivalDate, setArrivalDate] = useState<string>('2024-10-05');
    const [departureDate, setDepartureDate] = useState<string>('2024-10-07');
    const [guests, setGuests] = useState<number>(1);
    const [isReturnTrip, setIsReturnTrip] = useState<boolean>(true);

    const handleSearch = () => {
        // Логіка для обробки пошуку
        console.log({ destination, arrivalDate, departureDate, guests, isReturnTrip });
    };

    return (
        <div className="ticketComp">

            <div className="sidebar">
                <ul className="menu">
                    <li className="menu__item"><a href="#" className="menu__link">Тури</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Готелі</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Апартаменти</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Машини</a></li>
                    <li className="menu__item"><a href="#" className="menu__link">Трансфери</a></li>
                </ul>
            </div>

            <div className="all-conteiner">
                <div className="trip-type">
                    <label>
                        <input type="radio" name="trip" checked={!isReturnTrip} onChange={() => setIsReturnTrip(false)} />
                        в одну сторону
                    </label>
                    <label>
                        <input type="radio" name="trip" checked={isReturnTrip} onChange={() => setIsReturnTrip(true)} />
                        з поверненням
                    </label>
                </div>
        <div className="search-form">


            <div className="search-input">
                <label>Куди</label>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            <div className="date-input">
                <label>Прибуття</label>
                <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                />
            </div>

            <div className="date-input">
                <label>Виїзд</label>
                <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                />
            </div>

            <div className="guests-input">
                <label>Кількість гостей</label>
                <input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                />
            </div>

            <button onClick={handleSearch}><img width="25px" height="25px" src="icons\homepageSvg\dandruff.svg"></img>Шукати</button>
        </div>
        </div>
        </div>
    );
};

export default SearchForm;