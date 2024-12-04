import React, { createContext, useContext, useEffect, useState } from 'react';

interface HideContextType {
    isHidden: boolean;
    toggleHide: () => void;
};

const HideContext = createContext<HideContextType | undefined>(undefined);

export const HideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const toggleHide = () => {
        setIsHidden(!isHidden);
    };

    return (
        <HideContext.Provider value={{ isHidden, toggleHide }} >
            { children }
        </HideContext.Provider>
    );
};

export const useHideContext = (): HideContextType => {
    const context = useContext(HideContext);
    if (!context) {
        throw new Error('useHideContext must be used within a HideProvider');
    }
    return context;
};