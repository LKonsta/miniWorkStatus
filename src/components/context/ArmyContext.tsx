import React, { createContext, useContext, useEffect, useState } from 'react';
import armyService from '../../services/army';
import { ArmyType } from '../types/defaultTypes';

interface ArmyContextType {
    allArmies: ArmyType[];
    addArmy: (newArmy: ArmyType) => Promise<void>;
    modifyArmy: (id: string, updatedArmy: ArmyType) => Promise<void>;
    removeArmy: (id: string) => Promise<void>;
}

const ArmyContext = createContext<ArmyContextType | undefined>(undefined);

export const ArmyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allArmies, setAllArmies] = useState<ArmyType[]>([]);

    useEffect(() => {
        const fetchArmies = async () => {
            const initialArmies = await armyService.getAll();
            setAllArmies(initialArmies);
        };
        fetchArmies();
    }, []);

    const addArmy = async (newArmy: ArmyType) => {
        const returnedArmy = await armyService.create(newArmy);
        setAllArmies((prevArmies) => [...prevArmies, returnedArmy]);
    };

    const modifyArmy = async (id: string, updatedArmy: ArmyType) => {
        const returnedArmy = await armyService.update(id, updatedArmy);
        setAllArmies((prevArmies) =>
            prevArmies.map((army) => (army.id === id ? returnedArmy : army))
        );
    };

    const removeArmy = async (id: string) => {
        await armyService.remove(id);
        setAllArmies((prevArmies) => prevArmies.filter((army) => army.id !== id));
    };

    return (
        <ArmyContext.Provider value={{ allArmies, addArmy, modifyArmy, removeArmy }}>
            {children}
        </ArmyContext.Provider>
    );
};

export const useArmyContext = (): ArmyContextType => {
    const context = useContext(ArmyContext);
    if (!context) {
        throw new Error('useArmyContext must be used within an ArmyProvider');
    }
    return context;
};