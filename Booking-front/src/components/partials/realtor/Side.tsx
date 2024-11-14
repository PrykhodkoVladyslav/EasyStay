import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import { API_URL } from "utils/getEnvData.ts";
import { useSelector } from "react-redux";
import { getUser } from "store/slice/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { useRealtorActivePage } from "components/contexts/RealtorActivePage.tsx";

const Side = () => {
    const user = useSelector(getUser);
    const { activePage, setActivePage } = useRealtorActivePage();
    const navigate = useNavigate();
    if (!user) { return null; }

    const buttons = [
        { key: "home", name: "Головна", path: "realtor" },
        { key: "personal-data", name: "Особисті дані", path: "realtor/personal-data" },
        { key: "hotels", name: "Мої готелі", path: "realtor/hotels" },
        { key: "reviews", name: "Відгуки", path: "realtor/reviews" },
        { key: "archived", name: "Архів", path: "realtor/archived" },
    ];

    const handleButtonClick = (buttonKey: string, buttonPath: string) => {
        setActivePage(buttonKey);
        localStorage.setItem('activePage', buttonKey);
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
                    <p className="name">{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Невідомий Юзер"}</p>
                </div>

                <div className="content-bottom">
                    <div className="items">
                        {buttons.map((button) => (
                            <button
                                key={button.name}
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

export default Side;
