import { IconMenu2, IconLogin } from "@tabler/icons-react";
import ThemeToggle from "components/ui/ThemeToggle.tsx";
import UserCard from "components/cards/UserCard.tsx";
import { useAppSelector } from "store/hooks.ts";
import { Link } from "react-router-dom";

import React, { useState } from "react";

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { sidebarOpen, setSidebarOpen } = props;
    // const [searchModalOpen, setSearchModalOpen] = useState(false);
    // const user = useAppSelector(getUser);

    return (
        <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-10">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            className="text-slate-500 hover:text-slate-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <IconMenu2 className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center space-x-3">
                        {/*<div>*/}
                        {/*    <button*/}
                        {/*        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3 ${*/}
                        {/*            searchModalOpen && "bg-slate-200"*/}
                        {/*        }`}*/}
                        {/*        onClick={(e) => {*/}
                        {/*            e.stopPropagation();*/}
                        {/*            setSearchModalOpen(true);*/}
                        {/*        }}*/}
                        {/*        aria-controls="search-modal"*/}
                        {/*    >*/}
                        {/*        <span className="sr-only">Search</span>*/}
                        {/*        /!*<IconSearch className="text-slate-400 w-4 h-4" />*!/*/}
                        {/*    </button>*/}
                        {/*    <SearchModal isOpen={searchModalOpen} close={() => setSearchModalOpen(false)} />*/}
                        {/*</div>*/}
                        
                        {/*{user ? (*/}
                        {/*    <UserCard user={user} />*/}
                        {/*) : (*/}
                        {/*    <Link*/}
                        {/*        to={"auth/sign-in"}*/}
                        {/*        className="flex gap-3 items-center py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3"*/}
                        {/*    >*/}
                        {/*        <p className="text-xs font-semibold">Вхід</p>*/}
                        {/*        <IconLogin className="w-4 h-4" />*/}
                        {/*    </Link>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
