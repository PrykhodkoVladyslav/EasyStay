import { IconLogout, IconUser } from "@tabler/icons-react";
import { useAppDispatch } from "store/hooks.ts";
import { logOut } from "store/slice/userSlice.ts";
import { IUserCard } from "interfaces/user";
// import { getRandomColor } from "utils/getRandomColor.ts";

import React from "react";

const UserCard: React.FC<{ user: IUserCard }> = ({ user }) => {
    const dispatch = useAppDispatch();

    const initials = user.firstName && user.lastName ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : null;
    const displayName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email;

    const handleLogout = () => {
        dispatch(logOut());
    };

    const circleContent = initials ? (
        <span className="text-white">{initials}</span>
    ) : (
        <IconUser className="text-white" size={14} />
    );

    return (
        <>
            <div className="flex items-center p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3">
                <div className={`flex items-center justify-center w-5 h-5 text-[10px] rounded-full`}>
                {/*<div className={`flex items-center justify-center w-5 h-5 text-[10px] rounded-full ${getRandomColor()}`}>*/}
                    {circleContent}
                </div>
                <div className="ml-2">
                    <p className="text-xs font-semibold">{displayName}</p>
                </div>
            </div>
            <button
                className="flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white font-bold p-2"
                onClick={handleLogout}
            >
                <IconLogout className="w-4 h-4" />
            </button>
        </>
    );
};

export default UserCard;
