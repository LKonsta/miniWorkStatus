import React, { createContext, useContext, useEffect, useState } from 'react';
import statusService from '../../services/status';
import { StatusType } from '../types/defaultTypes';

interface StatusContextType {
    allStatuses: StatusType[];
    sortedStatuses: StatusType[];
    addStatus: (newStatus: StatusType) => Promise<void>;
    modifyStatus: (id: string, updatedStatus: StatusType) => Promise<void>;
    removeStatus: (id: string) => Promise<void>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allStatuses, setAllStatuses] = useState<StatusType[]>([]);
    const sortedStatuses = allStatuses.sort((a, b) => a.percentage - b.percentage);

    useEffect(() => {
        const fetchStatuses = async () => {
            const statuses = await statusService.getAll();
            setAllStatuses(statuses);
        };
        fetchStatuses();
    }, []);

    const addStatus = async (newStatus: StatusType) => {
        const returnedStatus = await statusService.create(newStatus);
        setAllStatuses((prevStatuses) => [...prevStatuses, returnedStatus]);
    };

    const modifyStatus = async (id: string, updatedStatus: StatusType) => {
        const returnedStatus = await statusService.update(id, updatedStatus);
        setAllStatuses((prevStatuses) =>
            prevStatuses.map((status) => (status.id === id ? returnedStatus : status))
        );
    };

    const removeStatus = async (id: string) => {
        await statusService.remove(id);
        setAllStatuses((prevStatuses) => prevStatuses.filter((status) => status.id !== id));
    };

    return (
        <StatusContext.Provider value={{ allStatuses, sortedStatuses, addStatus, modifyStatus, removeStatus }}>
            {children}
        </StatusContext.Provider>
    );
};

export const useStatusContext = (): StatusContextType => {
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error('useStatusContext must be used within a StatusProvider');
    }
    return context;
};