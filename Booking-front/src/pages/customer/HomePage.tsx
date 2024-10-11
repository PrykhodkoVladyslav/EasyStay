import React, { useContext, useEffect } from "react";

import Services from "components/HomePage/Services.tsx";
import TravelCarousel from "components/HomePage/TravelCarousel.tsx";
import DiscountsComponent from "components/HomePage/DiscountsComponent.tsx";
import TicketsComponent from "components/HomePage/TicketsComponent.tsx";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";


const HomePage: React.FC = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    useEffect(() => {
        activeMenuItemContext.setActivePage(undefined);
    });

    return (
        <div className="app">
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-content2">
                        <h1>Відкривай цікаві</h1><h1>місця з нами</h1>
                        <p>Легкий спосіб знайти унікальні місця для відпочинку та насолоди – приєднуйся до нас!</p>
                    </div>
                    <button className="cta-button">Шукати житло</button>
                </div>

            </div>
            <TicketsComponent />
            <TravelCarousel />

            <DiscountsComponent />


            <Services />

            <div className="discount">
                <div className="discount-content">
                    <h1>Отримайте постійну знижку -10% на деякі пропозиції після реєстрації</h1>
                    <button>Зареєструватись</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
