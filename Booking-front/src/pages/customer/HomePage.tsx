import React from 'react';

import Navbar from "components/HomePage/Navbar.tsx";
import Footer  from "components/HomePage/Footer.tsx";
import Services  from "components/HomePage/Services.tsx";
import TravelCarousel  from "components/HomePage/TravelCarousel.tsx";
import DiscountsComponent  from "components/HomePage/DiscountsComponent.tsx";


const HomePage: React.FC = () => {

    return (
        <div>
            <div className="app">
                <Navbar/>

                <header className="hero-section">
                    <div className="hero-content">
                        <div className="hero-content2">
                        <h1>Відкривай цікаві</h1><h1>місця з нами</h1>
                        <p>Легкий спосіб знайти унікальні місця для відпочинку та насолоди – приєднуйся до нас!</p>
                        </div>
                        <button className="cta-button">Шукати житло</button>
                    </div>

                </header>

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
