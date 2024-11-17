import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import "../css/footer.scss";
import { useAppSelector } from "store/index.ts";
import { getUserLocation } from "store/slice/userSlice.ts";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const userLocation = useAppSelector(getUserLocation);
    const infoUrl = `${userLocation}/info`;

    const toInfoPage = () => navigate(infoUrl);

    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-section side-section">
                    <img className="pointer" src={getPublicResourceUrl("logo/Logo_white.svg")} alt="EasyStay Logo"
                         onClick={() => navigate(userLocation)} />
                    <h2>Найкращі пропозиції житла для комфортного відпочинку!</h2>
                </div>
                <div className="footer-section">
                    <h3>Загальна інформація</h3>
                    <ul>
                        <li><a onClick={toInfoPage}>Про EasyStay</a></li>
                        <li><a onClick={toInfoPage}>Як ми працюємо</a></li>
                        <li><a onClick={toInfoPage}>Для регіонів</a></li>
                        <li><a onClick={toInfoPage}>Про EasyStay</a></li>
                        <li><a onClick={toInfoPage}>Як ми працюємо</a></li>
                        <li><a onClick={toInfoPage}>Для рієлторів</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Правила та налаштування</h3>
                    <ul>
                        <li><a onClick={toInfoPage}>Керуйте своїми подорожами</a></li>
                        <li><a onClick={toInfoPage}>Правила та умови</a></li>
                        <li><a onClick={toInfoPage}>Підтримка</a></li>
                        <li><a onClick={toInfoPage}>Керуйте своїми подорожами</a></li>
                        <li><a onClick={toInfoPage}>Правила та умови</a></li>
                        <li><a onClick={toInfoPage}>Підтримка</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Загальна інформація</h3>
                    <ul>
                        <li><a onClick={toInfoPage}>Про EasyStay</a></li>
                        <li><a onClick={toInfoPage}>Як ми працюємо</a></li>
                        <li><a onClick={toInfoPage}>Для регіонів</a></li>
                        <li><a onClick={toInfoPage}>Про EasyStay</a></li>
                        <li><a onClick={toInfoPage}>Як ми працюємо</a></li>
                        <li><a onClick={toInfoPage}>Для рієлторів</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Правила та налаштування</h3>
                    <ul>
                        <li><a onClick={toInfoPage}>Керуйте своїми подорожами</a></li>
                        <li><a onClick={toInfoPage}>Правила та умови</a></li>
                        <li><a onClick={toInfoPage}>Підтримка</a></li>
                        <li><a onClick={toInfoPage}>Керуйте своїми подорожами</a></li>
                        <li><a onClick={toInfoPage}>Правила та умови</a></li>
                        <li><a onClick={toInfoPage}>Підтримка</a></li>
                    </ul>
                </div>
                <div className="footer-section side-section">
                    <h3>Отримувати новини про знижки</h3>
                    <div className="footer-subscribe-box">
                        <input
                            type="email"
                            placeholder="Введіть ваш емейл"
                            className="footer-subscribe-input"
                        />
                        <button className="footer-subscribe-button">Підписатись</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;