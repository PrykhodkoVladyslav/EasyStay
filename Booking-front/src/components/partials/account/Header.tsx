import {getPublicResourceUrl} from "utils/publicAccessor.ts";
// import HorizontalPad from "components/ui/HorizontalPad.tsx";
import Dropdown from "components/ui/design/SelectLanguageDropdown.tsx";

const Header = () => {
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
        console.log("Profile clicked");

    };

    return (
        <header>
            <img
                src={getPublicResourceUrl("logo/logo_EasyStay.svg")}
                alt="EasyStay Logo"
                className="logo"
            />

            <div className="right-section">
                <div>
                    <Dropdown options={languageOptions} defaultOption="English"/>
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

export default Header;
