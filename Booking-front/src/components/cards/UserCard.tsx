import { useSelector } from "react-redux";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useAppDispatch } from "store/hooks.ts";
import { logOut, getUser } from "store/slice/userSlice.ts";
// import { getRandomColor } from "utils/getRandomColor.ts";
import { API_URL } from "utils/getEnvData.ts";

const UserCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useSelector(getUser);

    if (!user) {
        return null;
    }

    const initials = user.firstName && user.lastName ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : null;
    const displayName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email || "Невідомий Юзер";

    const handleLogout = () => {
        dispatch(logOut());
    };

    return (
        <>
            <div className="flex items-center p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3"
                 title={user.email}
            >
                <div className="flex items-center justify-center">
                    {user.photo ? (
                        <img
                            src={API_URL + `/images/200_${user.photo}`}
                            alt={displayName}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-gray-500 flex items-center justify-center rounded-full">
                            {initials ? (
                                <span className="text-white">{initials}</span>
                            ) : (
                                <IconUser className="text-white" size={14}/>
                            )}
                        </div>
                    )}
                </div>
                <div className="ml-2">
                    <p className="text-xs font-semibold">{displayName}</p>
                </div>
            </div>

            <button
                className="flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white font-bold p-2"
                onClick={handleLogout}
            >
                <IconLogout className="w-4 h-4"/>
            </button>
        </>
    );
};

export default UserCard;
