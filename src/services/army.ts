import axios from 'axios';
import { ArmyType } from '../components/types/defaultTypes';

const baseUrl = 'http://localhost:3001/armies';

// Fetch all armies
const getAll = async (): Promise<ArmyType[]> => {
    const response = await axios.get<ArmyType[]>(baseUrl);
    return response.data;
};

// Create a new army
const create = async (newObject: Omit<ArmyType, 'id'>): Promise<ArmyType> => {
    const response = await axios.post<ArmyType>(baseUrl, newObject);
    return response.data;
};

// Update an existing army
const update = async (id: string, newObject: Partial<ArmyType>): Promise<ArmyType> => {
    const response = await axios.put<ArmyType>(`${baseUrl}/${id}`, newObject);
    return response.data;
};

// Delete an army
const remove = async (id: string): Promise<void> => {
    await axios.delete(`${baseUrl}/${id}`);
};

export default {
    getAll,
    create,
    update,
    remove
};
