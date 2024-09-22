import React from 'react';
const Navbar: React.FC = () => {

    return (
        <div>

            <header className="navbar">
                <div className="navbar-logo">
                    <img  width="150%" src="./public/logo/logo_EasyStay.svg" alt="EasyStay Logo" />

                </div>
                <nav className="navbar-menu">
                    <a href="#hotels">Готелі</a>
                    <a href="#cars">Машини</a>
                    <a href="#apartments">Апартаменти</a>
                    <a href="#transfers">Трансфери</a>
                    <a href="#tours">Тури</a>
                </nav>
                <div className="navbar-actions">
                    <div className="language-switch">
                    <button className="language-switch">▼</button>
                    </div>
                    <a><img  src="./public/icons/homepageSvg/bell.svg" className="icon-bell"></img></a>
                    <a><img src="./public/icons/homepageSvg/people.svg" className="icon-user"></img></a>
                </div>
            </header>

        </div>
    );
};

export default Navbar;
