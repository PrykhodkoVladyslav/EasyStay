import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { useSelector } from "react-redux";
import { getUser } from "store/slice/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
    ActivePageOnHeaderContext,
} from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import { getApiImageUrl } from "utils/apiImageAccessor.ts";

const RealtorSide = () => {
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const activeMenuItemContext = useContext(ActivePageOnHeaderContext);
    const activePage = activeMenuItemContext?.activePage;

    if (!user) {
        return null;
    }

    const buttons = [
        { key: "personal-data", name: "Особисті дані", path: "customer/personal-data" },
        { key: "favorites", name: "Збережене", path: "customer/favorites" },
        { key: "payment", name: "Платіжні дані", path: "customer/payment-data" },
        { key: "bookings", name: "Історія бронювань", path: "customer/booking-history" },
    ];

    const handleButtonClick = (buttonKey: string, buttonPath: string) => {
        activeMenuItemContext?.setActivePage(buttonKey);
        navigate(`/${buttonPath}`);
    };

    return (
        <div className="side">
            <div className="left-side">
                <div className="head">
                    {user.photo ? (
                        <img
                            src={getApiImageUrl(user.photo, 800)}
                            alt=""
                        />
                    ) : (
                        <img
                            src={getPublicResourceUrl("account/no_user_photo.png")}
                            alt="Немає фото"
                        />
                    )}
                    <p className="name">
                        {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : "Невідомий Юзер"}
                    </p>
                </div>

                <div className="content-bottom">
                    <div className="items">
                        {buttons.map((button) => (
                            <button
                                key={button.key}
                                className="item"
                                onClick={() => handleButtonClick(button.key, button.path)}
                                style={{
                                    background: activePage === button.key ? "rgb(63, 82, 60)" : "none",
                                    color: activePage === button.key ? "white" : "black",
                                }}
                            >
                                {button.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealtorSide;
