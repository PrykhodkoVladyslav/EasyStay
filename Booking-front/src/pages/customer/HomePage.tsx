import React from 'react';

import Navbar from "components/HomePage/Navbar.tsx";
import Footer  from "components/Footer.tsx";
import Services  from "components/HomePage/Services.tsx";
import TravelCarousel  from "components/HomePage/TravelCarousel.tsx";
import DiscountsComponent  from "components/HomePage/DiscountsComponent.tsx";
import TicketsComponent  from "components/HomePage/TicketsComponent.tsx";


const HomePage: React.FC = () => {

    return (
        <div>
            <div className="app">
                <Navbar/>

                <div className="hero-section">
                    <div className="hero-content">
                        <div className="hero-content2">
                        <h1>Відкривай цікаві</h1><h1>місця з нами</h1>
                        <p>Легкий спосіб знайти унікальні місця для відпочинку та насолоди – приєднуйся до нас!</p>
                        </div>
                        <button className="cta-button">Шукати житло</button>
                    </div>

                </div>
                <TicketsComponent/>
                <TravelCarousel/>

                <DiscountsComponent/>



                <Services />

                <div className="discount">
                    <div className="discount-content">
                       <h1>Отримайте постійну знижку -10% на деякі пропозиції після реєстрації</h1>
                       <button>Зареєструватись</button>
                    </div>
                </div>


                <Footer />
            </div>


        </div>
    );
};

export default HomePage;
