import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { API_URL } from "utils/getEnvData.ts";
import { useSelector } from "react-redux";
import { getUser } from "store/slice/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RealtorSide = () => {
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState<string | null>(() => {
        const savedPage = localStorage.getItem("activePage");
        return savedPage ? savedPage : null;
    });

    useEffect(() => {
        if (activePage) {
            localStorage.setItem("activePage", activePage);
        }
    }, [activePage]);
    
    if (!user) {
        return null;
    }

    const buttons = [
        { name: "Особисті дані", path: "customer/personal-data" },
        { name: "Збережене", path: "customer/favorites" },
        { name: "Платіжні дані", path: "customer/payment-data" },
        { name: "Історія бронювань", path: "customer/booking-history" },
    ];

    const handleButtonClick = (buttonKey: string, buttonPath: string) => {
        setActivePage(buttonKey);
        navigate(`/${buttonPath}`);
    };

    return (
        <div className="side">
            <div className="left-side">
                <div className="head">
                    {user.photo ? (
                        <img
                            src={API_URL + `/images/800_${user.photo}`}
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
                                key={button.name}
                                className="item"
                                onClick={() => handleButtonClick(button.name, button.path)}
                                style={{
                                    background: activePage === button.name ? "rgb(63, 82, 60)" : "none",
                                    color: activePage === button.name ? "white" : "black",
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
