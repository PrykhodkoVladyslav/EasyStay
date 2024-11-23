import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, getToken } from "store/slice/userSlice";
import { jwtParser } from "utils/jwtParser.ts";
import { User } from "interfaces/user";

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = token ? jwtParser(token) as User : null;
    const role = user ? user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : undefined;

    const getProfilePath = () => {
        if (!token) return "/auth/login";

        switch (role) {
            case "Customer":
                return "/customer/personal-data";
            case "Realtor":
                return "/realtor";
            case "Admin":
                return "/admin";
            default:
                return "/auth/login";
        }
    };

    const handleLogout = () => {
        if (role === "Customer") {
            dispatch(logOut());
        }
        else {
            dispatch(logOut());
            navigate("/auth/login");
            onClose();
        }
    };

    const handleProfile = () => {
        navigate(getProfilePath());
        onClose();
    };

    return (
        <div className="profile-modal">
            <button onClick={handleProfile}>Мій профіль</button>
            {token ? (
                <button onClick={handleLogout}>Вихід</button>
            ) : (
                <button onClick={() => navigate("/auth/login")}>Вхід</button>
            )}
        </div>
    );
};

export default ProfileModal;
