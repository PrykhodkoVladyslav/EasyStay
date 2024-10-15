import { ActivePageOnHeaderContextType } from "./ActivePageOnHeaderContextType.ts";
import React from "react";

export const ActivePageOnHeaderContext = React.createContext<ActivePageOnHeaderContextType | null>(null);

const ActivePageOnHeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activePage, setActivePage] = React.useState<string | undefined>(undefined);

    return (
        <ActivePageOnHeaderContext.Provider value={{ activePage, setActivePage }}>
            {children}
        </ActivePageOnHeaderContext.Provider>
    );
};

export default ActivePageOnHeaderProvider;