import { useNavigate } from "react-router-dom";
import { getIconUrl } from "utils/publicAccessor.ts";

function Services() {
    const navigate = useNavigate();

    const toInfoPage = () => navigate("/info");

    return (
        <div className="services-container">
            <h1>Послуги, які ми пропонуємо</h1>
            <div className="service-list">
                <div className="service-item">
                    <img className="service-icon" src={getIconUrl("homepageSvg/servicesSvg/home.svg")} alt="icon" />
                    <h3>Готелі</h3>
                    <p>Зручний вибір та бронювання</p>
                    <a className="details-link" onClick={toInfoPage}>Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src={getIconUrl("homepageSvg/servicesSvg/bus.svg")} alt="icon" />
                    <h3>Трансфери</h3>
                    <p>Швидкі та надійні перевезення</p>
                    <a className="details-link" onClick={toInfoPage}>Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src={getIconUrl("homepageSvg/servicesSvg/apartments.svg")}
                         alt="icon" />
                    <h3>Апартаменти</h3>
                    <p>Комфортне проживання для відпочинку</p>
                    <a className="details-link" onClick={toInfoPage}>Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src={getIconUrl("homepageSvg/servicesSvg/tours.svg")} alt="icon" />
                    <h3>Тури</h3>
                    <p>Незабутні подорожі та екскурсії</p>
                    <a className="details-link" onClick={toInfoPage}>Детальніше</a>
                </div>
                <div className="service-item">
                    <img className="service-icon" src={getIconUrl("homepageSvg/servicesSvg/cars.svg")} alt="icon" />
                    <h3>Машини</h3>
                    <p>Оренда авто для вашої зручності</p>
                    <a className="details-link" onClick={toInfoPage}>Детальніше</a>
                </div>
            </div>
        </div>
    );
}

export default Services;