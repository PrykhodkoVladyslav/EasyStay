import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, getToken } from "store/slice/userSlice";
import { jwtParser } from "utils/jwtParser.ts";
import { User } from "interfaces/user";
import { useEffect, useRef } from "react";

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);
    const token = useSelector(getToken);
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

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="profile-modal" ref={modalRef}>
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
