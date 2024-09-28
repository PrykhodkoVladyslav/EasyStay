import {useState} from "react";
import {getPublicResourceUrl} from "utils/publicAccessor.ts";
import {API_URL} from "utils/getEnvData.ts";
import {useSelector} from "react-redux";
import {getUser} from "store/slice/userSlice.ts";
// import {IconUser} from "@tabler/icons-react";
// import HorizontalPad from "components/ui/HorizontalPad.tsx";
import {useNavigate} from "react-router-dom";

const Side = () => {
    const user = useSelector(getUser);
    const [activeButton, setActiveButton] = useState<string>("Головна");
    const navigate = useNavigate();

    if (!user) {
        return null;
    }

    const displayName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email || "Невідомий Юзер";

    const buttons = [
        { name: "Головна", path: "" },
        { name: "Особисті дані", path: "personal-data" },
        { name: "Мої готелі", path: "hotels" },
        { name: "Відгуки", path: "reviews" },
        { name: "Архів", path: "archived" },
        { name: "Знижки", path: "discounts" },
    ];

    const handleButtonClick = (buttonName: string, buttonPath: string) => {
        setActiveButton(buttonName);
        navigate(`/realtor/${buttonPath}`);
    };

    return (
        <div className="left-side">
            <div className="head">
                {user.photo ? (
                    <img
                        src={API_URL + `/images/800_${user.photo}`}
                        alt=""
                        className="photo"
                    />
                ) : (
                    <img
                        src={getPublicResourceUrl("account/no_user_photo.png")}
                        alt="Немає фото"
                        className="photo"
                    />
                )}
                <p className="name">{displayName}</p>
            </div>

            <div className="content-bottom">
                <div className="items">
                    {buttons.map((button) => (
                        <button
                            key={button.name}
                            className="item"
                            onClick={() => handleButtonClick(button.name, button.path)}
                            style={{
                                height: activeButton === button.name ? "39px" : "28px",
                                background: activeButton === button.name ? "rgb(63, 82, 60)" : "none",
                                color: activeButton === button.name ? "white" : "black",
                            }}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Side;
