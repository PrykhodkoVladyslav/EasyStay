import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "components/partials/ProfileModal.tsx";
import "./../../../css/realtor-header.scss";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

const RealtorHeader = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    const activePage = activeMenuItemContext?.activePage;
    const [profileIsModalOpen, setProfileIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const menuItemData = [
        { key: "home", name: "Кабінет", href: "" },
        { key: "hotels", name: "Мої готелі", href: "hotels" },
        { key: "reviews", name: "Відгуки", href: "reviews" },
        { key: "archived", name: "Архів", href: "archived" },
    ];

    const menuItems = menuItemData.map((item, index) => (
        <button
            key={index}
            className={`pages ${item.key === activePage ? "active" : ""}`}
            onClick={() => navigate(item.href)}
        >{item.name}</button>
    ));

    const handleLogoClick = () => {
        navigate("/realtor");
    };

    const handleMessagesClick = () => {
        navigate("/realtor/chat");
    };

    const handleProfileClick = () => {
        setProfileIsModalOpen(prev => !prev);
    };

    return (
        <header className="realtor-header">
            <img
                onClick={handleLogoClick}
                src={getPublicResourceUrl("logo/logo_EasyStay.svg")}
                alt="EasyStay Logo"
                className="logo pointer"
            />

            <div className="center-section"> {menuItems} </div>

            <div className="right-section">
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

export default RealtorHeader;
