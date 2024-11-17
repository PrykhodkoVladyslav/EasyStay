import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useContext, useState } from "react";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import { useNavigate } from "react-router-dom";
import ProfileModal from "components/partials/ProfileModal.tsx";

const CustomerHeader = () => {
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    const [profileIsModalOpen, setProfileIsModalOpen] = useState(false);
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

    const handleMessagesClick = () => {
        navigate("/chat");
    };

    const handleProfileClick = () => {
        setProfileIsModalOpen(prev => !prev);
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

export default CustomerHeader;
