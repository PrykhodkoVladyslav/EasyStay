import React, { useContext, useEffect, useState } from "react";

import Services from "components/HomePage/Services.tsx";
import TravelCarousel from "components/HomePage/TravelCarousel.tsx";
import DiscountsComponent from "components/HomePage/DiscountsComponent.tsx";
import SearchHotelSection from "components/partials/customer/SearchHotelSection.tsx";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useNavigate } from "react-router-dom";


const HomePage: React.FC = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext?.setActivePage(undefined);
    }, []);

    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(null);
    const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(null);
    const [adultGuests, setAdultGuests] = useState(1);

    const onSearch = () => {
        const queryParams: string[] = [];

        if (city) queryParams.push(`city=${city}`);
        if (selectedDateFrom) queryParams.push(`dateFrom=${selectedDateFrom.toISOString()}`);
        if (selectedDateTo) queryParams.push(`dateTo=${selectedDateTo.toISOString()}`);
        if (adultGuests) queryParams.push(`adultGuests=${adultGuests}`);

        if (queryParams.length === 0) {
            navigate("/hotels");
            return;
        }

        navigate(`/hotels?${queryParams.join("&")}`);
    };

    return (
        <div className="app">
            <div className="hero-section">
                <img className="imgHero" src={getPublicResourceUrl("images/Homepage/Union.png")} alt="hero" />
                <div className="hero-content">
                    <div className="hero-content2">
                        <h1>Відкривай цікаві</h1><h1>місця з нами</h1>
                        <p>Легкий спосіб знайти унікальні місця для відпочинку та насолоди – приєднуйся до нас!</p>
                    </div>
                    <button className="cta-button" onClick={() => navigate("/hotels")}>Шукати житло</button>
                </div>
            </div>

            <SearchHotelSection
                city={city}
                setCity={setCity}
                selectedDateFrom={selectedDateFrom}
                setSelectedDateFrom={setSelectedDateFrom}
                selectedDateTo={selectedDateTo}
                setSelectedDateTo={setSelectedDateTo}
                adultGuests={adultGuests}
                setAdultGuests={setAdultGuests}
                onSearch={onSearch}
            />

            <TravelCarousel />

            <DiscountsComponent />

            <Services />

            <div className="discount">
                <img className="imgDisk" src={getPublicResourceUrl("images/Homepage/night.jpg")}
                     alt="discount background"></img>
                <div className="discount-content">
                    <h1>Отримайте постійну знижку -10% на деякі пропозиції після реєстрації</h1>
                    <button onClick={() => navigate("/auth/register")}>Зареєструватись</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
