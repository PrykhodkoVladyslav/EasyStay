import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import Dropdown from "components/ui/design/SelectLanguageDropdown.tsx";
import { useContext, useEffect, useState } from "react";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import { useNavigate } from "react-router-dom";
import ProfileModal from "components/partials/ProfileModal.tsx";

const Header = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    const [profileIsModalOpen, setProfileIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const menuItemData = [
        { name: "Кабінет", href: "/hotels" },
        { name: "Мої готелі", href: "/realtor/hotels" },
        { name: "Відгуки", href: "/realtor/reviews" },
        { name: "Архів", href: "/realtor/archived" },
    ];

    const menuItems = menuItemData.map((item, index) => (
        <button
            key={index}
            className={`pages ${item.name === activeMenuItemContext?.activePage ? "active" : ""}`}
            onClick={() => navigate(item.href)}
        >{item.name}</button>
    ));

    useEffect(() => {
        activeMenuItemContext?.setActivePage("Кабінет");
        activeMenuItemContext?.setActivePage("Мої готелі");
        activeMenuItemContext?.setActivePage("Відгуки");
        activeMenuItemContext?.setActivePage("Архів");
    });

    const languageOptions = [
        { full: "English", abbr: "En" },
        { full: "Українська", abbr: "Укр" }
    ];

    const handleMessagesClick = () => {
        console.log("Messages clicked");

    };

    const handleNotificationsClick = () => {
        console.log("Notifications clicked");

    };

    const handleProfileClick = () => {
        setProfileIsModalOpen(prev => !prev);
    };

    return (
        <header>
            <a onClick={() => navigate("/realtor")} style={{cursor: "pointer"}}>
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
                    <Dropdown options={languageOptions} defaultOption="Українська"/>
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
                    {profileIsModalOpen && (
                        <ProfileModal onClose={() => setProfileIsModalOpen(false)} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
