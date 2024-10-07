import React from 'react';

function Services() {
    return (
        <div className="services-container">
            <h1>Послуги, які ми пропонуємо</h1>
            <div className="service-list">
                <div className="service-item">
                    <img className="service-icon" src=".\public\icons\homepageSvg\servicesSvg\home.svg"></img>
                    <h3>Готелі</h3>
                    <p>Зручний вибір та бронювання</p>
                    <a href="#" className="details-link">Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src=".\public\icons\homepageSvg\servicesSvg\bus.svg"></img>
                    <h3>Трансфери</h3>
                    <p>Швидкі та надійні перевезення</p>
                    <a href="#" className="details-link">Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src=".\public\icons\homepageSvg\servicesSvg\apartaments.svg"></img>
                    <h3>Апартаменти</h3>
                    <p>Комфортне проживання для відпочинку</p>
                    <a href="#" className="details-link">Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src=".\public\icons\homepageSvg\servicesSvg\turs.svg"></img>
                    <h3>Тури</h3>
                    <p>Незабутні подорожі та екскурсії</p>
                    <a href="#" className="details-link">Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src=".\public\icons\homepageSvg\servicesSvg\cars.svg"></img>
                    <h3>Машини</h3>
                    <p>Оренда авто для вашої зручності</p>
                    <a href="#" className="details-link">Детальніше</a>
                </div>
            </div>
        </div>
    );
}

export default Services;