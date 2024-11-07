import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import Dropdown from "components/ui/design/SelectLanguageDropdown.tsx";
import { useContext, useEffect } from "react";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import { useNavigate } from "react-router-dom";

const CustomerHeader = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    const navigate = useNavigate();

    const menuItemData = [
        { name: "Готелі", href: "/hotels" },
        { name: "Авто", href: "/" },
        { name: "Апартаменти", href: "/" },
        { name: "Трансфери", href: "/" },
        { name: "Тури", href: "/" },
    ];

    const menuItems = menuItemData.map((item, index) => (
        <button
            key={index}
            className={`pages ${item.name === activeMenuItemContext?.activePage ? "active" : ""}`}
            onClick={() => navigate(item.href)}
        >{item.name}</button>
    ));

    useEffect(() => {
        activeMenuItemContext?.setActivePage("Готелі");
    });

    const languageOptions = [
        { full: "English", abbr: "En" },
        { full: "Українська", abbr: "Укр" },
    ];

    const handleMessagesClick = () => {
        console.log("Messages clicked");

    };

    const handleNotificationsClick = () => {
        console.log("Notifications clicked");

    };

    const handleProfileClick = () => {
        console.log("Profile clicked");

    };

    return (
        <header className="header">
            <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <img
                    src={getPublicResourceUrl("logo/logo_EasyStay.svg")}
                    alt="EasyStay Logo"
                    className="logo"
                />
            </a>

            <div className="center-section">
                {menuItems}
            </div>

            <div className="right-section">
                <div>
                    <Dropdown options={languageOptions} defaultOption="Українська" />
                </div>

                <div className="user-section">
                    <button
                        className="messages"
                        onClick={handleMessagesClick}>

                        <img
                            src={getPublicResourceUrl("account/header/messages.svg")}
                            alt="Messages"
                        />
                    </button>

                    <button
                        className="notifications"
                        onClick={handleNotificationsClick}>

                        <img
                            src={getPublicResourceUrl("account/header/ring.svg")}
                            alt="Notifications"
                        />
                    </button>

                    <button
                        className="profile"
                        onClick={handleProfileClick}>

                        <img
                            src={getPublicResourceUrl("account/header/profile.svg")}
                            alt="Profile"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default CustomerHeader;
