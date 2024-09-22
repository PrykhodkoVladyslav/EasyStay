import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Загальна інформація</h4>
                    <ul>
                        <li>Про EasyStay</li>
                        <li>Як ми працюємо</li>
                        <li>Для регіонів</li>
                        <li>Про EasyStay</li>
                        <li>Як ми працюємо</li>
                        <li>Для рієлторів</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Правила та налаштування</h4>
                    <ul>
                        <li>Керуйте своїми подорожами</li>
                        <li>Правила та умови</li>
                        <li>Підтримка</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Отримувати новини про знижки</h4>
                    <div className="subscribe-box">
                        <input
                            type="email"
                            placeholder="Введіть ваш емейл"
                            className="subscribe-input"
                        />
                        <button className="subscribe-button">Підписатись</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;