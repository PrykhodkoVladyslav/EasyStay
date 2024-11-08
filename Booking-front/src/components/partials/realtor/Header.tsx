import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import Dropdown from "components/ui/design/SelectLanguageDropdown.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "components/partials/ProfileModal.tsx";
import { useRealtorActivePage } from "components/contexts/RealtorActivePage.tsx";

const Header = () => {
    const { activePage, setActivePage } = useRealtorActivePage();
    const [profileIsModalOpen, setProfileIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const menuItemData = [
        { key: "personal-data", name: "Кабінет", href: "personal-data" },
        { key: "hotels", name: "Мої готелі", href: "hotels" },
        { key: "reviews", name: "Відгуки", href: "reviews" },
        { key: "archived", name: "Архів", href: "archived" },
    ];

    const menuItems = menuItemData.map((item, index) => (
        <button
            key={index}
            className={`pages ${item.key === activePage ? "active" : ""}`}
            onClick={() => {
                setActivePage(item.key);
                navigate(item.href);
            }}
        >{item.name}</button>
    ));

    const languageOptions = [
        { full: "English", abbr: "En" },
        { full: "Українська", abbr: "Укр" }
    ];

    const handleLogoClick = () => {
        setActivePage("home");
        navigate("/realtor");
    };

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
            <img
                onClick={handleLogoClick}
                src={getPublicResourceUrl("logo/logo_EasyStay.svg")}
                alt="EasyStay Logo"
                className="logo pointer"
            />

            <div className="center-section"> {menuItems} </div>

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
