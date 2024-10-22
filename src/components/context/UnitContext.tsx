import React, { createContext, useContext, useEffect, useState } from 'react';
import unitService from '../../services/unit'; 
import { UnitType } from '../types/defaultTypes';

interface UnitContextType {
    allUnits: UnitType[];
    addUnit: (newUnit: UnitType) => Promise<void>;
    modifyUnit: (id: string, updatedUnit: UnitType) => Promise<void>;
    removeUnit: (id: string) => Promise<void>;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider: React.FC<{ children: React.ReactNode; armyId: string }> = ({ children, armyId }) => {
    const [allUnits, setAllUnits] = useState<UnitType[]>([]);

    useEffect(() => {
        const fetchUnits = async () => {
            const initialUnits = await unitService.getAll(armyId);
            setAllUnits(initialUnits);
        };
        fetchUnits();
    }, []);

    const addUnit = async (newUnit: UnitType) => {
        const returnedUnit = await unitService.create(newUnit);
        setAllUnits((prevUnits) => [...prevUnits, returnedUnit]);
    };

    const modifyUnit = async (id: string, updatedUnit: UnitType) => {
        const returnedUnit = await unitService.update(id, updatedUnit);
        setAllUnits((prevUnits) =>
            prevUnits.map((unit) => (unit.id === id ? returnedUnit : unit))
        );
    };

    const removeUnit = async (id: string) => {
        await unitService.remove(id);
        setAllUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== id));
    };

    return (
        <UnitContext.Provider value={{ allUnits, addUnit, modifyUnit, removeUnit }}>
            {children}
        </UnitContext.Provider>
    );
};

export const useUnitContext = (): UnitContextType => {
    const context = useContext(UnitContext);
    if (!context) {
        throw new Error('useUnitContext must be used within a UnitProvider');
    }
    return context;
};
