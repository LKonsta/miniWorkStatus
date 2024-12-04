import React, { createContext, useContext, useEffect, useState } from 'react';
import baseService from '../../services/bases';
import { BaseType } from '../types/defaultTypes';


interface BaseContextType {
    allBases: BaseType[];
    addBase: (newBase: BaseType) => Promise<void>;
    modifyBase: (id: string, updatedBase: BaseType) => Promise<void>;
    removeBase: (id: string) => Promise<void>;
}

const BaseContext = createContext<BaseContextType | undefined>(undefined);

export const BaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allBases, setAllBases] = useState<BaseType[]>([]);

    useEffect(() => {
        const fetchBases = async () => {
            const bases = await baseService.getAll();
            setAllBases(bases);
        };
        fetchBases();
    }, []);

    const addBase = async (newBase: BaseType) => {
        const returnedBase = await baseService.create(newBase);
        setAllBases((prevBases) => [...prevBases, returnedBase]);
    };

    const modifyBase = async (id: string, updatedBase: BaseType) => {
        const returnedBase = await baseService.update(id, updatedBase);
        setAllBases((prevBases) =>
            prevBases.map((base) => (base.id === id ? returnedBase : base))
        );
    };

    const removeBase = async (id: string) => {
        await baseService.remove(id);
        setAllBases((prevBases) => prevBases.filter((base) => base.id !== id));
    };

    return (
        <BaseContext.Provider value={{ allBases, addBase, modifyBase, removeBase }}>
            {children}
        </BaseContext.Provider>
    );
};

export const useBaseContext = (): BaseContextType => {
    const context = useContext(BaseContext);
    if (!context) {
        throw new Error('useBaseContext must be used within a BaseProvider');
    }
    return context;
};