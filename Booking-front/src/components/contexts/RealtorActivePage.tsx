import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type RealtorActivePageType = {
    activePage: string;
    setActivePage: (page: string) => void;
};

type RealtorActivePageProviderProps = {
    children: ReactNode;
};

const RealtorActivePage = createContext<RealtorActivePageType | undefined>(undefined);

export const RealtorActivePageProvider: React.FC<RealtorActivePageProviderProps> = ({ children }) => {
    const [activePage, setActivePage] = useState<string>(() => {
        const storedActivePage = localStorage.getItem("activePage");
        return storedActivePage ? storedActivePage : "Головна";
    });

    useEffect(() => {
        localStorage.setItem("activePage", activePage);
    }, [activePage]);

    return (
        <RealtorActivePage.Provider value={{ activePage, setActivePage }}>
            {children}
        </RealtorActivePage.Provider>
    );
};

export const useRealtorActivePage = () => {
    const context = useContext(RealtorActivePage);
    if (!context) {
        throw new Error("useActivePage має використовуватися всередині RealtorActivePageProvider");
    }
    return context;
};
