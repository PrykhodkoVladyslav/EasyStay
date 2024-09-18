import {useState} from "react";
import {getPublicResourceUrl} from "utils/publicAccessor.ts";
import {API_URL} from "utils/getEnvData.ts";
import {useSelector} from "react-redux";
import {getUser} from "store/slice/userSlice.ts";
// import {IconUser} from "@tabler/icons-react";
// import HorizontalPad from "components/ui/HorizontalPad.tsx";

const Side = () => {
    const user = useSelector(getUser);
    const [activeButton, setActiveButton] = useState<string>("Головна");

    if (!user) {
        return null;
    }

    const displayName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email || "Невідомий Юзер";

    const buttons = [
        "Головна",
        "Особисті дані",
        "Мої готелі",
        "Відгуки",
        "Архів"
    ];

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
    };

    return (
        <div className="left-side">
            <div className="head">
                {user.photo ? (
                    <img
                        src={API_URL + `/images/800_${user.photo}`}
                        alt={displayName}
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
                            key={button}
                            className="item"
                            onClick={() => handleButtonClick(button)}
                            style={{
                                background: activeButton === button ? "rgb(63, 82, 60)" : "white",
                                color: activeButton === button ? "white" : "black",
                            }}
                        >
                            {button}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Side;
